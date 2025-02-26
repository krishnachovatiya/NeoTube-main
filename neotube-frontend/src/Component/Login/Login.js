import React, { useState } from "react";
import "./Login.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setLoginModal }) => {

    const [isLoading, setIsLoading] = useState(false);
 
  const navigate = useNavigate(); // For redirection
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login
  
  const handleLogin = async () => {
    
    if (!formData.usernameOrEmail || !formData.password) {
      toast.error("Please enter both username/email and password");
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        formData, 
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  

      localStorage.setItem("accessToken", response.data.data.accessToken);
      
      toast.success("Login successful!");
      setLoginModal();
      setTimeout(() => navigate("/profile"), 1500);

      
      
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
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
            />
          </div>
        </div>

        <div className="login_buttons">
          <div className="login-btn" onClick={handleLogin}>
            Login
          </div>
          <Link to={"/signup"} onClick={() => setLoginModal()} className="login-btn">
            SignUp
          </Link>
          <div className="login-btn" onClick={() => setLoginModal()}>
            Cancel
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
