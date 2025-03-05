import React, { useState, useEffect } from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const HomePage = ({ sidenavbar }) => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const options = ["All", "Comedy", "Education", "Music", "Mixes", "Calculus", "Indian Pop Music", "Live", "Debates", "Dancing", "Cricket", "Movies", "T-Series", "Watched", "New to You", "News", "Coke Studio"]

  useEffect(() => {
   
    const fetchVideos = async () => {
      try {
        
        const response = await axios.get('http://localhost:3000/api/v1/video/');
        
        setVideos(response.data.data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching videos:', err)
        console.error('Error details:', err.response?.data || 'No response data') 
        setError(`Failed to fetch videos: ${err.message}`)
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])



  return (
    <div className={sidenavbar ? 'homepage' : 'fullHomepage'}>
      <div className="homepage-options">
        {options.map((item, index) => {
          return (
            <div key={index} className="homepage-option">{item}</div>
          )
        })}
      </div>
      
      <div className={sidenavbar ? "home-mainpage" : "fullMainHomePage"}>
        {loading ? (
          <div>Loading videos...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          videos.map((video) => (
            <Link to={`/watch/${video.id}`} className="neotube-video" key={video.id}>
              <div className="neotube-thumbnailBox">
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title} 
                  className="thumbnailPic" 
                />
            
                <div className="thumbnail-timing">--:--</div>
              </div>
              <div className="neotube-TitleBox">
                <div className="neotube-TitleBoxProfile">
                  <img 
                    src={video.user.profilePicture} 
                    alt={video.user.username} 
                    className="thumbnailProfilePic" 
                  />
                </div>
                <div className="neotube-TitleBoxTitle">
                  <div className="videoTitle">{video.title}</div>
                  <div className="videoChannelName">{video.user.username}</div>
                  <div className="videoViews">{video.views} views</div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default HomePage