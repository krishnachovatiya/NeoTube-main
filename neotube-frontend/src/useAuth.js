import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(
    localStorage.getItem('userProfilePic') || 
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);

    const fetchUserProfile = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/user/user', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });

          const userData = response.data.data;
          setUserDetails(userData);

          if (userData.profilePicture) {
            setUserProfilePic(userData.profilePicture);
            localStorage.setItem('userProfilePic', userData.profilePicture);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          if (error.response?.status === 401) {
            logout();
          }
        }
      }
    };

    fetchUserProfile();

    const handleStorageChange = (e) => {
      if (e.key === 'accessToken') {
        setIsLoggedIn(!!e.newValue);
      }
      if (e.key === 'userProfilePic') {
        setUserProfilePic(e.newValue || 
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        );
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/user/signin',
        credentials,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const accessToken = response.data?.data?.accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        setIsLoggedIn(true);

        const userResponse = await axios.get('http://localhost:3000/api/v1/user/user', {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        });

        const userData = userResponse.data.data;
        setUserDetails(userData);

        if (userData.profilePicture) {
          setUserProfilePic(userData.profilePicture);
          localStorage.setItem('userProfilePic', userData.profilePicture);
        }

        return userData;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userProfilePic');
    setIsLoggedIn(false);
    setUserDetails(null);
    setUserProfilePic(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    );
  };

  return {
    isLoggedIn,
    userDetails,
    userProfilePic,
    login,
    logout,
    setUserProfilePic
  };
};