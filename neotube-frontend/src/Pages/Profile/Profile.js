import React, { useEffect, useState } from "react";
import "./Profile.css";
import SideNavbar from "../../Component/SideNavbar/SideNavbar";
import axios from "axios";

const Profile = ({ sidenavbar }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
    profilePicture: null,
    coverPicture: null,
  });
  const [error, setError] = useState("");

 
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        setError("Unauthorized: Please log in again.");
        return null;
      }
      
      const response = await axios.get("http://localhost:3000/api/v1/user/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      
      if (response.data.data) {
        setUser(response.data.data);
        setFormData({
          channelName: response.data.data.channelName || "",
          description: response.data.data.description || "",
          profilePicture: null, // Reset file inputs
          coverPicture: null,   // Reset file inputs
        });
        return response.data.data; // Return the user data
      }
      return null;
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
      setError("Failed to fetch user data.");
      return null;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      setError("Unauthorized: Please log in again.");
      return;
    }
  
    const formDataToSend = new FormData();
    
   
    if (formData.channelName) {
      formDataToSend.append("channelName", formData.channelName);
    }
    
    if (formData.description) {
      formDataToSend.append("description", formData.description);
    }
    
    if (formData.profilePicture instanceof File) {
      formDataToSend.append("profilePicture", formData.profilePicture);
    }
    
    if (formData.coverPicture instanceof File) {
      formDataToSend.append("coverPicture", formData.coverPicture);
    }
  
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/setup-profile", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
  
      if (response.data.success) {
        
        const updatedUser = await fetchUser();
        
       
        if (updatedUser && updatedUser.profilePicture && formData.profilePicture instanceof File) {
          localStorage.setItem("userProfilePic", updatedUser.profilePicture);
          
          
          const profileUpdateEvent = new CustomEvent('profileUpdate', { 
            detail: { profilePicture: updatedUser.profilePicture } 
          });
          window.dispatchEvent(profileUpdateEvent);
        }
        
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to update profile. Please try again.");
    }
  };
  

  return (
    <div className="profile">
      <SideNavbar sidenavbar={sidenavbar} />

      {/* <div className="cover-container">
        <img
          className="cover-image"
          src={user?.coverPicture || process.env.PUBLIC_URL + "/default-cover.jpg"}
          alt="Cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = process.env.PUBLIC_URL + "/default-cover.jpg";
          }}
        />
      </div> */}


      <div className={sidenavbar ? "profile_page" : "profile_page_inactive"}>
        <div className="profile_top_section">
          <div className="profile_top_section_profile">
            <img
              className="profile_top_section_img"
              src={user?.profilePicture || process.env.PUBLIC_URL + "/default-profile-pic.jpg"}
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = process.env.PUBLIC_URL + "/default-profile-pic.jpg";
              }}
            />
          </div>

          <div className="profile_top_section_about">
            <div className="profile_top_section_about_name">
              {user?.username || "User"}
            </div>
            <div className="profile_top_section_info">
              {user?.channelName || "No Channel"} .{" "}
              {Array.isArray(user?.videos) ? user.videos.length : 0} videos
            </div>
            <div className="profile_top_section_info">
              {user?.description || "No description added"}
            </div>
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
          </div>
        </div>

        {error && <p className="error_message">{error}</p>}

        {isEditing && (
          <form onSubmit={handleSubmit} className="profile_edit_form">
            <input
              type="text"
              name="channelName"
              value={formData.channelName}
              onChange={handleChange}
              placeholder="Enter Channel Name"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              required
            />
            <input type="file" name="profilePicture" onChange={handleFileChange} accept="image/*" />
            <input type="file" name="coverPicture" onChange={handleFileChange} accept="image/*" />
            <button type="submit">Save</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
