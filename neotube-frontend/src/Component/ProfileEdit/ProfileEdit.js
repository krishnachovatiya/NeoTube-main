import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileEdit.css';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

const ProfileEdit = ({ sidenavbar, userData }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    channelName: userData?.channelName || '',
    description: userData?.description || '',
    profilePicture: null,
    coverPicture: null
  });
  
  const [previewUrls, setPreviewUrls] = useState({
    profilePicture: userData?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPjv1lHEIpzgDk_e3Sm-e4EVOzggYdb5aHA&s",
    coverPicture: userData?.coverPicture || "https://www.vdocipher.com/blog/wp-content/uploads/2023/12/DALL%C2%B7E-2023-12-10-20.21.58-A-creative-and-visually-appealing-featured-image-for-a-blog-about-video-thumbnails-for-various-social-platforms-like-YouTube-Instagram-and-TikTok-s-1024x585.png"
  });
  
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Update form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        channelName: userData.channelName || '',
        description: userData.description || '',
        profilePicture: null,
        coverPicture: null
      });
      
      setPreviewUrls({
        profilePicture: userData.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPjv1lHEIpzgDk_e3Sm-e4EVOzggYdb5aHA&s",
        coverPicture: userData.coverPicture || "https://www.vdocipher.com/blog/wp-content/uploads/2023/12/DALL%C2%B7E-2023-12-10-20.21.58-A-creative-and-visually-appealing-featured-image-for-a-blog-about-video-thumbnails-for-various-social-platforms-like-YouTube-Instagram-and-TikTok-s-1024x585.png"
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      
      // Create preview URL
      const fileUrl = URL.createObjectURL(files[0]);
      setPreviewUrls({ ...previewUrls, [name]: fileUrl });
    }
  };

  const triggerFileInput = (inputRef) => {
    inputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('channelName', formData.channelName);
      formDataToSend.append('description', formData.description);
      
      if (formData.profilePicture) {
        formDataToSend.append('profilePicture', formData.profilePicture);
      }
      
      if (formData.coverPicture) {
        formDataToSend.append('coverPicture', formData.coverPicture);
      }
      
      const response = await axios.post('/api/setup-profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 200) {
        setIsEditing(false);
        // Optionally refresh user data here or redirect
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error (show error message to user)
    }
  };

  return (
    <div className={sidenavbar ? "profile_page" : "profile_page_inactive"}>
      {/* Cover Picture Section */}
      <div className="profile_cover_section">
        <img 
          className="profile_cover_img" 
          src={previewUrls.coverPicture} 
          alt="Cover" 
        />
        {isEditing && (
          <button 
            className="edit_cover_btn"
            onClick={() => triggerFileInput(coverInputRef)}
          >
            <EditIcon /> Change Cover
          </button>
        )}
      </div>

      <div className="profile_top_section">
        <div className="profile_top_section_profile">
          <img 
            className="profile_top_section_img" 
            src={previewUrls.profilePicture} 
            alt="Profile" 
          />
          {isEditing && (
            <div className="edit_profile_pic_overlay" onClick={() => triggerFileInput(profileInputRef)}>
              <EditIcon />
            </div>
          )}
        </div>

        <div className="profile_top_section_about">
          {!isEditing ? (
            <>
              <div className="profile_top_section_about_name">
                {userData?.channelName || userData?.name || "Krishna Chovatiya"}
                <button className="edit_profile_btn" onClick={() => setIsEditing(true)}>
                  <EditIcon /> Edit Profile
                </button>
              </div>
              <div className="profile_top_section_info">@{userData?.username || "User1"} . {userData?.videoCount || 5} videos</div>
              <div className="profile_top_section_info">
                {userData?.description || "About myself"}
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="profile_edit_form">
              <input 
                type="file" 
                name="profilePicture" 
                ref={profileInputRef}
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
                accept="image/*"
              />
              <input 
                type="file" 
                name="coverPicture" 
                ref={coverInputRef}
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
                accept="image/*"
              />
              
              <div className="form_group">
                <label>Channel Name</label>
                <input 
                  type="text" 
                  name="channelName" 
                  value={formData.channelName} 
                  onChange={handleInputChange}
                  placeholder="Enter your channel name"
                />
              </div>
              
              <div className="form_group">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange}
                  placeholder="Tell viewers about your channel"
                  rows={3}
                />
              </div>
              
              <div className="form_actions">
                <button type="button" className="cancel_btn" onClick={() => setIsEditing(false)}>
                  <CloseIcon /> Cancel
                </button>
                <button type="submit" className="save_btn">
                  <SaveIcon /> Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;