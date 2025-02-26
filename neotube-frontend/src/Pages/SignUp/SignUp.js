import React, { useState } from 'react'
import './SignUp.css'
import { Link,useNavigate } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const SignUp = ({setSideNavbarFunc}) => {
    const [signUpField,setsignUpField] = useState({"userName":"", "email":"" ,"password":""});
    const navigate=useNavigate();
   
    const handleInputField=(event,name)=>{
        setsignUpField({
            ...signUpField,[name]:event.target.value
        })
    }


    const handleSignup= async()=>{
        try {
            if (!signUpField.userName || !signUpField.password || !signUpField.email) {
                toast.error("Please fill all required fields!");
                return;
            }

            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                username: signUpField.userName,
                email: signUpField.email,  
                password: signUpField.password
            });

            if (response.status === 201) {
                toast.success("Sign-up successful!");
                if (setSideNavbarFunc) {
                    setSideNavbarFunc(false);
                }
                navigate('/login');  
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed!");
           
        }
    }

    const progressBar=()=>{""}

  return (
    <div className='signUp'>
            <div className="signup_card">

                <div className="signUp_title">
                    <YouTubeIcon sx={{ fontSize: "54px" }} className='login_youtubeImage' />
                    SignUp
                </div>

                <div className="signUp_Inputs">
                    
                <input type="text" className="signUp_Inputs_inp" value={signUpField.userName} onChange={(e)=>{handleInputField(e,"userName")}} placeholder='User Name'/>
                <input type="text" className="signUp_Inputs_inp" value={signUpField.email} onChange={(e)=>{handleInputField(e,"email")}} placeholder='Email'/>
                <input type="password" className="signUp_Inputs_inp" value={signUpField.password} onChange={(e)=>{handleInputField(e,"password")}} placeholder='Password'/>

                  
                    <div className="signUpBtns">
                        <div className="signUpBtn" onClick={handleSignup}>SignUp</div>
                        <Link to={'/'} className="signUpBtn">Home Page</Link>

                    </div>

                    {progressBar && <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>}

                </div>

            </div>
            <ToastContainer />
        </div>
  )
}

export default SignUp