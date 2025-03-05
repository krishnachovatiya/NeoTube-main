import React, { useState } from 'react';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Home from './Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Video from './Pages/Video/Video';
import Profile from './Pages/Profile/Profile';
import VideoUpload from './Pages/VideoUpload/VideoUpload';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Component/Login/Login';
import { UserProvider } from './useContext';

function App() {
  const [sidenavbar, setSideNavbar] = useState(true);

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  }

  return (
    <UserProvider>
      <div className="App">
        <Navbar setSideNavbarFunc={setSideNavbarFunc} sidenavbar={sidenavbar}/>
        <Routes>
          <Route path='/' element={<Home sidenavbar={sidenavbar}/>} />
          <Route path='/watch/:id' element={<Video/>} />
          <Route path='/upload' element={<VideoUpload/>} />
          <Route path='/signup' element={<SignUp setSideNavbarFunc={setSideNavbarFunc}/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;