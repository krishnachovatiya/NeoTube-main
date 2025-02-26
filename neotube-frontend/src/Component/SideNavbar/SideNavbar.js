import React from 'react'
import './SideNavbar.css'
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ContentCutIcon from '@mui/icons-material/ContentCut';

const SideNavbar = ({sidenavbar}) => {
  return (
   <div className={sidenavbar?"home-sideNavbar": "homeSideNavbarhide"}>
        <div className="home-sideNavbarTop">
            <div className={`home-sideNavbarTopOption`}>
                <HomeIcon/>
                <div className="home-sideNavbarTopOptionTitle">Home</div>
            </div>

            <div className={`home-sideNavbarTopOption`}>
                <VideocamIcon/>
                <div className="home-sideNavbarTopOptionTitle">Shorts</div>
            </div>

            <div className={`home-sideNavbarTopOption`}>
                <SubscriptionsIcon/>
                <div className="home-sideNavbarTopOptionTitle">Subscription</div>
            </div>
        </div>

        <div className="home-sideNavbarMiddle">
            
            <div className={`home-sideNavbarTopOption`}>
            <div className="home-sideNavbarTopOptionTitle">You</div>
                <ChevronRightIcon/>
            </div>
            <div className={`home-sideNavbarTopOption`}>
                <RecentActorsIcon/>
                <div className="home-sideNavbarTopOptionTitle">Your Channel</div>
            </div>
            <div className={`home-sideNavbarTopOption`}>
                <HistoryIcon/>
                <div className="home-sideNavbarTopOptionTitle">History</div>
            </div>
            <div className={`home-sideNavbarTopOption`}>
                <PlaylistPlayIcon/>
                <div className="home-sideNavbarTopOptionTitle">Playlist</div>
            </div>
            <div className={`home-sideNavbarTopOption`}>
                <OndemandVideoIcon/>
                <div className="home-sideNavbarTopOptionTitle">Your Videos</div>
            </div>
            <div className={`home-sideNavbarTopOption`}>
                <HistoryIcon/>
                <div className="home-sideNavbarTopOptionTitle">Watch Later</div>
            </div>
            <div className={`home-sideNavbarTopOption`}>
                <ThumbUpOffAltIcon/>
                <div className="home-sideNavbarTopOptionTitle">Liked Videos</div>
            </div>
            <div className={`home-sideNavbarTopOption`}>
                <ContentCutIcon/>
                <div className="home-sideNavbarTopOptionTitle">Your Clips</div>
            </div>
            
        </div>
        
        <div className="home-sideNavbarMiddle">
            
            <div className={`home-sideNavbarTopOption`}>
            <div className="home-sideNavbarTopOptionTitle">Subscriptions</div>
            </div>

            <div className="home-sideNavbarTopOption">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoXBdcf4NAaHCxscAxFxcSDhanmOUjCMuReA&s" alt="" className="sidebar_logo" />
                <div className="home-sideNavbarTopOptionTitle">Aaj Tak</div>
            </div>
            
            <div className="home-sideNavbarTopOption">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3I8MHCoQwIr7JRNGJofutnnyXyD12S0aRBw&s" alt="" className="sidebar_logo" />
                <div className="home-sideNavbarTopOptionTitle">Unacademy</div>
            </div>

            <div className="home-sideNavbarTopOption">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvh56y4giPRR4JYSsXUGXUL9Shkd6kGkOaPQ&s" alt="" className="sidebar_logo" />
                <div className="home-sideNavbarTopOptionTitle">NesoAcademy</div>
            </div>

            <div className="home-sideNavbarTopOption">
                <img src="https://logowik.com/content/uploads/images/ndtv9182.logowik.com.webp" alt="" className="sidebar_logo" />
                <div className="home-sideNavbarTopOptionTitle">NDTV India</div>
            </div>


        </div>        

   </div>
  )
}

export default SideNavbar
