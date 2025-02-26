import React from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'




const HomePage = ({sidenavbar}) => {
 
const options=["All", "Comedy", "Education", "Music", "Mixes", "Calculus", "Indian Pop Music", "Live", "Debates", "Dancing", "Cricket", "Movies", "T-Series", "Watched", "New to You", "News", "Coke Studio" ]
  return (
   <div className={sidenavbar?'homepage' : 'fullHomepage'}>
      <div className="homepage-options">
       {options.map((item,index)=>{
        return(
          <div key={index} className="homepage-option">{item}</div>
        )
       })}


      </div>


      <div className={sidenavbar? "home-mainpage" : "fullMainHomePage"}>
        <Link to={'/watch/1234'} className="neotube-video">
          <div className="neotube-thumbnailBox">
            <img src="https://www.vdocipher.com/blog/wp-content/uploads/2023/12/DALL%C2%B7E-2023-12-10-20.21.58-A-creative-and-visually-appealing-featured-image-for-a-blog-about-video-thumbnails-for-various-social-platforms-like-YouTube-Instagram-and-TikTok-s-1024x585.png" alt="thumbnail" className="thumbnailPic" />
            <div className="thumbnail-timing">20:00</div>
          </div>

          <div className="neotube-TitleBox">
            <div className="neotube-TitleBoxProfile">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPjv1lHEIpzgDk_e3Sm-e4EVOzggYdb5aHA&s" alt="" className="thumbnailProfilePic" />
            </div>

          <div className="neotube-TitleBoxTitle">
            <div className="videoTitle">User 1</div>
            <div className="videoChannelName">Channel 1</div>
            <div className="videoViews">3 likes</div>
          </div>

          </div>
         
        </Link>
        <div className="neotube-video">
          <div className="neotube-thumbnailBox">
            <img src="https://www.vdocipher.com/blog/wp-content/uploads/2023/12/DALL%C2%B7E-2023-12-10-20.21.58-A-creative-and-visually-appealing-featured-image-for-a-blog-about-video-thumbnails-for-various-social-platforms-like-YouTube-Instagram-and-TikTok-s-1024x585.png" alt="thumbnail" className="thumbnailPic" />
            <div className="thumbnail-timing">20:00</div>
          </div>

          <div className="neotube-TitleBox">
            <div className="neotube-TitleBoxProfile">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPjv1lHEIpzgDk_e3Sm-e4EVOzggYdb5aHA&s" alt="" className="thumbnailProfilePic" />
            </div>

          <div className="neotube-TitleBoxTitle">
            <div className="videoTitle">User 1</div>
            <div className="videoChannelName">Channel 1</div>
            <div className="videoViews">3 likes</div>
          </div>

          </div>
         
        </div>
        <div className="neotube-video">
          <div className="neotube-thumbnailBox">
            <img src="https://www.vdocipher.com/blog/wp-content/uploads/2023/12/DALL%C2%B7E-2023-12-10-20.21.58-A-creative-and-visually-appealing-featured-image-for-a-blog-about-video-thumbnails-for-various-social-platforms-like-YouTube-Instagram-and-TikTok-s-1024x585.png" alt="thumbnail" className="thumbnailPic" />
            <div className="thumbnail-timing">20:00</div>
          </div>

          <div className="neotube-TitleBox">
            <div className="neotube-TitleBoxProfile">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPjv1lHEIpzgDk_e3Sm-e4EVOzggYdb5aHA&s" alt="" className="thumbnailProfilePic" />
            </div>

          <div className="neotube-TitleBoxTitle">
            <div className="videoTitle">User 1</div>
            <div className="videoChannelName">Channel 1</div>
            <div className="videoViews">3 likes</div>
          </div>

          </div>
         
        </div>
        <div className="neotube-video">
          <div className="neotube-thumbnailBox">
            <img src="https://www.vdocipher.com/blog/wp-content/uploads/2023/12/DALL%C2%B7E-2023-12-10-20.21.58-A-creative-and-visually-appealing-featured-image-for-a-blog-about-video-thumbnails-for-various-social-platforms-like-YouTube-Instagram-and-TikTok-s-1024x585.png" alt="thumbnail" className="thumbnailPic" />
            <div className="thumbnail-timing">20:00</div>
          </div>

          <div className="neotube-TitleBox">
            <div className="neotube-TitleBoxProfile">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPjv1lHEIpzgDk_e3Sm-e4EVOzggYdb5aHA&s" alt="" className="thumbnailProfilePic" />
            </div>

          <div className="neotube-TitleBoxTitle">
            <div className="videoTitle">User 1</div>
            <div className="videoChannelName">Channel 1</div>
            <div className="videoViews">3 likes</div>
          </div>

          </div>
         
        </div>
        <div className="neotube-video">
          <div className="neotube-thumbnailBox">
            <img src="https://www.vdocipher.com/blog/wp-content/uploads/2023/12/DALL%C2%B7E-2023-12-10-20.21.58-A-creative-and-visually-appealing-featured-image-for-a-blog-about-video-thumbnails-for-various-social-platforms-like-YouTube-Instagram-and-TikTok-s-1024x585.png" alt="thumbnail" className="thumbnailPic" />
            <div className="thumbnail-timing">20:00</div>
          </div>

          <div className="neotube-TitleBox">
            <div className="neotube-TitleBoxProfile">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPjv1lHEIpzgDk_e3Sm-e4EVOzggYdb5aHA&s" alt="" className="thumbnailProfilePic" />
            </div>

          <div className="neotube-TitleBoxTitle">
            <div className="videoTitle">User 1</div>
            <div className="videoChannelName">Channel 1</div>
            <div className="videoViews">3 likes</div>
          </div>

          </div>
         
        </div>
      </div>

   </div>

  

  )
}

export default HomePage