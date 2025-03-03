import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Home from './Pages/Home/Home';
import {Link, Route, Routes} from 'react-router-dom';
import Video from './Pages/Video/Video';
import Profile from './Pages/Profile/Profile';
import VideoUpload from './Pages/VideoUpload/VideoUpload';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Component/Login/Login';

function App() {
  const[sidenavbar,setSideNavbar]=useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPic, setUserPic] = useState(
    localStorage.getItem("userProfilePic") || 
    "https://media.istockphoto.com/id/1087531642/vector/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-person-vector.jpg"
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const setSideNavbarFunc=(value)=>{
    setSideNavbar(value);
  }
  return (
    <div className="App">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sidenavbar={sidenavbar}/>
      <Routes>
        <Route path='/' element={<Home sidenavbar={sidenavbar}/>} />
        <Route path='/watch/:id' element={<Video/>} />
        {/* <Route path='/user/:id' element={<Profile sidenavbar={sidenavbar}/>} /> */}
        <Route path='/upload' element={<VideoUpload/>} />
        <Route path='/signup' element={<SignUp  setSideNavbarFunc={setSideNavbarFunc}/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
      
    </div>
  );
}

export default App;
