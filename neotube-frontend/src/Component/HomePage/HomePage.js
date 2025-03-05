import React, { useState, useEffect } from 'react'
import './HomePage.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUserContext } from './../../useContext'

const HomePage = ({ sidenavbar }) => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { isLoggedIn, userDetails } = useUserContext()
  const navigate = useNavigate()

  const options = [
    "All", "Comedy", "Education", "Music", "Mixes", 
    "Calculus", "Indian Pop Music", "Live", "Debates", 
    "Dancing", "Cricket", "Movies", "T-Series", 
    "Watched", "New to You", "News", "Coke Studio"
  ]

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const config = token 
          ? { 
              headers: { Authorization: `Bearer ${token}` },
              params: { limit: 20, page: 1 }
            }
          : { params: { limit: 20, page: 1 } }

        const response = await axios.get('http://localhost:3000/api/v1/video/', config);
        
        setVideos(response.data.data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching videos:', err)
        setError(`Failed to fetch videos: ${err.message}`)
        setLoading(false)

        if (err.response?.status === 401) {
          navigate('/login')
        }
      }
    }

    fetchVideos()
  }, [navigate])

  const formatViews = (views) => {
    if (views >= 1_000_000) {
      return `${(views / 1_000_000).toFixed(1)}M views`
    } else if (views >= 1_000) {
      return `${(views / 1_000).toFixed(1)}K views`
    }
    return `${views} views`
  }

  const renderGreeting = () => {
    if (isLoggedIn && userDetails) {
      return (
        <div className="user-greeting">
          Welcome, {userDetails.username || 'User'}!
        </div>
      )
    }
    return null
  }

  return (
    <div className={sidenavbar ? 'homepage' : 'fullHomepage'}>
      {renderGreeting()}
      
      <div className="homepage-options">
        {options.map((item, index) => (
          <div key={index} className="homepage-option">{item}</div>
        ))}
      </div>
      
      <div className={sidenavbar ? "home-mainpage" : "fullMainHomePage"}>
        {loading ? (
          <div className="loading-container">
            <p>Loading videos...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        ) : videos.length === 0 ? (
          <div className="no-videos-container">
            <p>No videos found</p>
          </div>
        ) : (
          videos.map((video) => (
            <Link 
              to={`/watch/${video.id}`} 
              className="neotube-video" 
              key={video.id}
            >
              <div className="neotube-thumbnailBox">
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title} 
                  className="thumbnailPic" 
                  loading="lazy"
                />
                <div className="thumbnail-timing">--:--</div>
              </div>
              <div className="neotube-TitleBox">
                <div className="neotube-TitleBoxProfile">
                  <img 
                    src={video.user.profilePicture} 
                    alt={video.user.username} 
                    className="thumbnailProfilePic"
                    loading="lazy"
                  />
                </div>
                <div className="neotube-TitleBoxTitle">
                  <div className="videoTitle">{video.title}</div>
                  <div className="videoChannelName">{video.user.username}</div>
                  <div className="videoViews">
                    {formatViews(video.views)}
                  </div>
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