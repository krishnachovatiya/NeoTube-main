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
import { useUserContext } from './../../useContext';


const Navbar = ({ setSideNavbarFunc, sidenavbar }) => {
  const [navbarModal, setNavbarModal] = useState(false);
  const { 
    isLoggedIn, 
    userProfilePic, 
    logout 
  } = useUserContext();
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/profile');
    setNavbarModal(false);
  };

  const handleUploadClick = () => {
    if (!isLoggedIn) {
      alert("You need to log in to upload a video!");
      navigate("/login");
    } else {
      navigate("/upload");
    }
  };

  const handleLogout = () => {
    logout();
    setNavbarModal(false);
    navigate("/login");
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
        <img 
          onClick={() => setNavbarModal(!navbarModal)} 
          src={userProfilePic} 
          className='navbar-right-logo' 
          alt='User' 
        />

        {navbarModal && (
          <div className="navbar_modal">
            {isLoggedIn ? (
              <>
                <div className="navbar_modal_option" onClick={handleProfile}>Profile</div>
                <div className="navbar_modal_option" onClick={handleLogout}>Logout</div>
              </>
            ) : (
              <>
                <div 
                  className="navbar_modal_option" 
                  onClick={() => { navigate('/login'); setNavbarModal(false); }}
                >
                  Sign In
                </div>
                <div 
                  className="navbar_modal_option" 
                  onClick={() => { navigate('/signup'); setNavbarModal(false); }}
                >
                  Sign Up
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;