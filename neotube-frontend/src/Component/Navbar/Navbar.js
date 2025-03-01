import React, { useState, useEffect } from 'react';
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ setSideNavbarFunc, sidenavbar }) => {

  const navigate = useNavigate();

  const [userPic, setUserPic] = useState(
    localStorage.getItem("userProfilePic") ||
    "https://media.istockphoto.com/id/1087531642/vector/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-person-vector.jpg?s=612x612&w=0&k=20&c=FEppaMMfyIYV2HJ6Ty8tLmPL1GX6Tz9u9Y8SCRrkD-o="
  );
  const [navbarModal, setNavbarModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile();  
    }
  }, []);
  
  
  

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
  
      const response = await axios.get('http://localhost:3000/api/v1/user/user', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
  
      if (response.data.data.profilePicture) {
        localStorage.setItem("userProfilePic", response.data.data.profilePicture);
        setUserPic(response.data.data.profilePicture);
      }
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
    }
  };
  

  const handleProfile = () => {
    navigate('/user/12');
    setNavbarModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userProfilePic");

    setIsLoggedIn(false);
    setUserPic("https://media.istockphoto.com/id/1087531642/vector/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-person-vector.jpg");

    navigate("/login");
  };
  
  const handleUploadClick = () => {
    if (!isLoggedIn) {
      alert("You need to log in to upload a video!");
      navigate("/login");
    } else {
      navigate("/upload");
    }
  };

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <div className="menuiconss" onClick={() => setSideNavbarFunc(!sidenavbar)}>
          <MenuIcon sx={{ color: "white" }} />
        </div>
        <Link to={'/'} className="navbar_youtubeImg">
          <YouTubeIcon sx={{ color: "red", fontSize: "34px" }} />
          <div className="navbar_youtubeTitle">NeoTube</div>
        </Link>
      </div>

      <div className="navbar_middle">
        <div className="navbar_searchBox">
          <input type="text" placeholder="Search" className='navbar_searchBoxInput' />
          <div className="navbar_searchIconBox">
            <SearchIcon sx={{ color: "white", fontSize: "28px" }} />
          </div>
        </div>
        <div className="navbar_mic">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>
      </div>

      <div className="navbar_right">
        <VideoCallIcon 
          sx={{ color: "white", fontSize: "30px", cursor: "pointer" }} 
          onClick={handleUploadClick} 
        />
        <NotificationsIcon sx={{ color: "white", fontSize: "30px", cursor: "pointer" }} />
        <img onClick={() => setNavbarModal(!navbarModal)} src={userPic} className='navbar-right-logo' alt='User' />

        {navbarModal && (
          <div className="navbar_modal">
            {isLoggedIn ? (
              <>
                <div className="navbar_modal_option" onClick={handleProfile}>Profile</div>
                <div className="navbar_modal_option" onClick={handleLogout}>Logout</div>
              </>
            ) : (
              <>
                <div className="navbar_modal_option" onClick={() => navigate('/login')}>Sign In</div>
                <div className="navbar_modal_option" onClick={() => navigate('/signup')}>Sign Up</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
