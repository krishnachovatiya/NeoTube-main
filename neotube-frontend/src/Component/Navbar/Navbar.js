import React, { useState, useEffect } from 'react';
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ setSideNavbarFunc, sidenavbar }) => {

  const location = useLocation()

  const navigate = useNavigate();

  const [userPic, setUserPic] = useState(
    localStorage.getItem("userProfilePic") ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [navbarModal, setNavbarModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

useEffect(() => {
  const token = localStorage.getItem('accessToken');
  const storedProfilePic = localStorage.getItem("userProfilePic");
  
  setIsLoggedIn(!!token);
  
  if (storedProfilePic) {
    setUserPic(storedProfilePic);
  } else if (token) {
    fetchUserProfile();
  } else {
    setUserPic("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  }

  const handleProfileUpdate = (event) => {
    if (event.detail && event.detail.profilePicture) {
      setUserPic(event.detail.profilePicture);
    }
  };

  window.addEventListener("profileUpdate", handleProfileUpdate);
  
  const handleStorageChange = (e) => {
    if (e.key === "accessToken") {
      setIsLoggedIn(!!e.newValue);
    }
    if (e.key === "userProfilePic" && e.newValue) {
      setUserPic(e.newValue);
    }
  };
  
  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("profileUpdate", handleProfileUpdate);
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);
  
const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const response = await axios.get('http://localhost:3000/api/v1/user/user', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    if (response.data.data.profilePicture) {
      setUserPic(response.data.data.profilePicture);
      localStorage.setItem("userProfilePic", response.data.data.profilePicture);
    }
    
    setIsLoggedIn(true);
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      setIsLoggedIn(false);
    }
  }
};
  
  const handleProfile = () => {
    navigate('/profile');
  setNavbarModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userProfilePic");

    setIsLoggedIn(false);
    setNavbarModal(false);
    setUserPic("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    navigate("/login");
  };
  
  const handleUploadClick = () => {
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
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
                <div className="navbar_modal_option" onClick={() => { navigate('/login'); setNavbarModal(false); }}>Sign In</div>
                <div className="navbar_modal_option" onClick={() => { navigate('/signup'); setNavbarModal(false); }}>Sign Up</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;