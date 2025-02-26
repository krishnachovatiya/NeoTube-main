import React from 'react'
import './Profile.css'
import SideNavbar from '../../Component/SideNavbar/SideNavbar'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link } from 'react-router-dom';


const Profile = ({sidenavbar}) => {
  return (
    <div className='profile'>
      <SideNavbar sidenavbar={sidenavbar}/>

      <div className={sidenavbar ? "profile_page" : "profile_page_inactive"}>

        <div className="profile_top_section">
            <div className="profile_top_section_profile">
                <img className='profile_top_section_img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPjv1lHEIpzgDk_e3Sm-e4EVOzggYdb5aHA&s" alt="" />
            </div>

            <div className="profile_top_section_about">
                <div className="profile_top_section_about_name">Krishna Chovatiya</div>
                <div className="profile_top_section_info">@User1  . 5 videos</div>
                <div className="profile_top_section_info">
                    About myself
                </div>
            </div>

        </div>

        <div className="profile_videos">
            <div className="profile_videos_title">Videos &nbsp; <ArrowRightIcon/> </div>

            <div className="profile_main_videos">
                
                <Link to={'/watch/id'} className="profile_video_block">
                    <div className="profile_video_block_thumbnail">
                        <img className='profile_video_block_img' src="https://www.vdocipher.com/blog/wp-content/uploads/2023/12/DALL%C2%B7E-2023-12-10-20.21.58-A-creative-and-visually-appealing-featured-image-for-a-blog-about-video-thumbnails-for-various-social-platforms-like-YouTube-Instagram-and-TikTok-s-1024x585.png" alt="" />
                    </div>
                

                <div className="profile_video_block_detail">
                    <div className="profile_video_block_detail_name">Video title</div>
                    <div className="profile_video_block_detail_about">Create at 2024-09-12</div>
                </div>
                </Link>

                <div className="profile_video_block">
                    <div className="profile_video_block_thumbnail">
                        <img className='profile_video_block_img' src="https://www.vdocipher.com/blog/wp-content/uploads/2023/12/DALL%C2%B7E-2023-12-10-20.21.58-A-creative-and-visually-appealing-featured-image-for-a-blog-about-video-thumbnails-for-various-social-platforms-like-YouTube-Instagram-and-TikTok-s-1024x585.png" alt="" />
                    </div>
                

                <div className="profile_video_block_detail">
                    <div className="profile_video_block_detail_name">Video title</div>
                    <div className="profile_video_block_detail_about">Create at 2024-09-12</div>
                </div>
                </div>

                <div className="profile_video_block">
                    <div className="profile_video_block_thumbnail">
                        <img className='profile_video_block_img' src="https://www.vdocipher.com/blog/wp-content/uploads/2023/12/DALL%C2%B7E-2023-12-10-20.21.58-A-creative-and-visually-appealing-featured-image-for-a-blog-about-video-thumbnails-for-various-social-platforms-like-YouTube-Instagram-and-TikTok-s-1024x585.png" alt="" />
                    </div>
                

                <div className="profile_video_block_detail">
                    <div className="profile_video_block_detail_name">Video title</div>
                    <div className="profile_video_block_detail_about">Create at 2024-09-12</div>
                </div>
                </div>

            </div>

            

        </div>

      </div>
    </div>
  ) 
}

export default Profile
