import React, { useState } from "react";
import "./Login.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from './../../useContext';

const Login = ({ setLoginModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUserContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    if (!formData.usernameOrEmail || !formData.password) {
      toast.error("Please enter both username/email and password");
      return;
    }
    
    setIsLoading(true);
    try {
      await login(formData);
      
      toast.success("Login successful!");
      setLoginModal && setLoginModal(); 
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login_card">
        <div className="titleCard_login">
          <YouTubeIcon sx={{ fontSize: "54px" }} className="login_youtubeImage" />
          Login
        </div>
        <div className="loginCredentials">
          <div className="userNameLogin">
            <input
              type="text"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className="userNameLoginUserName"
              placeholder="Username or Email"
              disabled={isLoading}
            />
          </div>
          <div className="userNameLogin">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="userNameLoginUserName"
              placeholder="Password"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="login_buttons">
          <div 
            className={`login-btn ${isLoading ? "disabled" : ""}`} 
            onClick={!isLoading ? handleLogin : null}
          >
            {isLoading ? "Logging in..." : "Login"}
          </div>
          <Link 
            to={"/signup"} 
            onClick={() => setLoginModal && setLoginModal()} 
            className="login-btn"
          >
            SignUp
          </Link>
          <div 
            className="login-btn" 
            onClick={() => {
              setLoginModal && setLoginModal(); 
              navigate("/");
            }}
          >
            Cancel
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;