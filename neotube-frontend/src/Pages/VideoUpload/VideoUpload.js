import React, { useState } from "react";
import "./VideoUpload.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";  
import LinearProgress from "@mui/material/LinearProgress";

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);

    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    }
  };

  const handleUpload = async () => {
    if (!title || !description || !video) {
      alert("Title, Description, and Video are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    setLoading(true);
    setProgress(0); 

    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post("http://localhost:3000/api/v1/video/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });

      console.log(response.data);
      alert("Video uploaded successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="videoUpload">
      <div className="uploadBox">
        <div className="uploadVideoTitle">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
          Upload Video
        </div>

        <div className="uploadForm">
          <input
            type="text"
            placeholder="Title of video"
            className="uploadFormInputs"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="uploadFormInputs"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
         

          <div>
            Thumbnail <input type="file" accept="image/*" onChange={handleThumbnailChange} />
          </div>
          <div>
            Video <input type="file" accept="video/mp4, video/webm, video/*" onChange={handleVideoChange} />
          </div>
          
        
          {videoPreview && (
            <div className="video-preview">
              <video src={videoPreview} controls width="100%" height="auto" />
            </div>
          )}
        </div>

       
        {loading && (
          <div className="progress-bar">
            <LinearProgress variant="determinate" value={progress} />
            <p>{progress}% Uploaded</p>
          </div>
        )}

        <div className="uploadBtns">
          <button className="uploadBtn-form" onClick={handleUpload} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Upload"}
          </button>
          <Link to={"/"} className="uploadBtn-form">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
