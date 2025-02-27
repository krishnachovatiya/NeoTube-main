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
        return;
      }


      const response = await axios.get("http://localhost:3000/api/v1/user/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("User data response:", response.data);
      if (response.data.data) {
        setUser(response.data.data);
        setFormData({
          channelName: response.data.data.channelName || "",
          description: response.data.data.description || "",
          profilePicture: response.data.data.profilePicture || null,
          coverPicture: response.data.data.coverPicture || null,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
      setError("Failed to fetch user data.");
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
    formDataToSend.append("channelName", formData.channelName);
    formDataToSend.append("description", formData.description);
    if (formData.profilePicture) {
      formDataToSend.append("profilePicture", formData.profilePicture);
    }
    if (formData.coverPicture) {
      formDataToSend.append("coverPicture", formData.coverPicture);
    }

    console.log("Sending Form Data:");
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/setup-profile", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log("Profile updated:", response.data);
      if (response.data.success) {
        setUser({
          ...user,
          channelName: formData.channelName,
          description: formData.description,
          profilePicture: formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : user?.profilePicture,
          coverPicture: formData.coverPicture ? URL.createObjectURL(formData.coverPicture) : user?.coverPicture,
        });
        localStorage.setItem("userProfilePic", URL.createObjectURL(formData.profilePicture)); 
        setIsEditing(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      setError("Failed to update profile. Please try again.");
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
