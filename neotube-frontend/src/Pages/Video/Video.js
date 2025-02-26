import React from 'react'
import './Video.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {toast,ToastContainer} from 'react-toastify'
import { Link } from 'react-router-dom';

const Video = () => {
  return (
    <div className='video'>
      <div className="videoPostSection">
        <div className="video_neoTube">
            <video className='video_neoTube_videos' width="400" controls autoPlay >
                <source src={"https://www.google.com/search?sca_esv=c935ac157191f824&rlz=1C1CHBD_enIN1143IN1143&sxsrf=AHTn8zogD5X3rLh010lBNPwyDz4VAHadTQ:1737650686628&q=short+video+20+second&source=lnms&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBjLjqIC1CYKD9D-DQAQS3Z49oR1qp-GHVCzRMbvBmBq7Ug5Qh2orPrTocEzu8v4scKXU5UvGYUuNobQE3InpIaUDR96EuhJCk_2lxLVHJfxZt72uvbi35J-atNuiyysEClldIXAYryT_WcO8QQ3zxK2Fxy9Ye0xzFE3kTJeWrEZ6XaexIQ&sa=X&ved=2ahUKEwi5_q2fpYyLAxXjSmwGHb4DD8YQ0pQJegQIEBAB&biw=1600&bih=732&dpr=1.2#"} type='video/mp4' />
            </video>
        </div>

        <div className="videoAbout">
            <div className="videoTitle">{"Javascript for begineers"}</div>

            <div className="neoTube_video_ProfileBlock">
                <div className="neoTube_video_ProfileBlockLeft">
                    <Link to={'/user/12'} className="ProfileBlockLeftImages">
                        <img className='ProfileBlockLeftImage' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3I8MHCoQwIr7JRNGJofutnnyXyD12S0aRBw&s" alt="" />
                    </Link>

                    <div className="video_subsView">
                        <div className="neoTubeProfileName">{"User 1"}</div>
                        <div className="neoTubeProfileSubs">{"2024-01-20"}</div>
                    </div>

                    <div className="subsButton">Subscribe</div>

                </div>


                <div className="neoTube_video_LikeBlock">
                    <div className="neoTube_video_LikeBlock_Like">
                        <ThumbUpIcon/>
                        <div className="neoTube_video_LikeBlock_NoOfLikes">{}</div>
                    </div>

                    <div className="likesDivider"></div>
                    <div className="neoTube_video_LikeBlock_Like">
                        <ThumbDownIcon/>
                        <div className="neoTube_video_LikeBlock_NoOfLikes">{}</div>
                    </div>

                </div>


            </div>

            <div className="neotube_video_about">
              <div>2025-01-25</div>
              <div>That's my first video of NeoTube</div>
            </div>

            <div className="neotubeCommentSection">

              <div className="neotubeCommentSectionTitle">2 comment</div>
              
              <div className="neotubeSelfComment"> 
                <img className='neotubeSelfCommentProfile' src="https://media.istockphoto.com/id/1087531642/vector/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-person-vector.jpg?s=612x612&w=0&k=20&c=FEppaMMfyIYV2HJ6Ty8tLmPL1GX6Tz9u9Y8SCRrkD-o=" alt="" srcset="" />
                <div className="addAComment">
                  <input type="text" className='addACommentInput' placeholder='Add a comment' />
                  <div className="cancelSubmitComment">
                    <div className="cancelComment">Cancel</div>
                    <div className="cancelComment">Comment</div>  
                  </div>
                </div>
              </div>

              <div className="neotubeOtherComments">
                <div className="neotubeSelfComment"> 
                  <img className='neotubeSelfCommentProfile' src="https://media.istockphoto.com/id/1087531642/vector/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-person-vector.jpg?s=612x612&w=0&k=20&c=FEppaMMfyIYV2HJ6Ty8tLmPL1GX6Tz9u9Y8SCRrkD-o=" alt="" srcset="" />
                 
                  <div className="otherCommentSection">
                    <div className="otherCommentSectionHeader">
                      <div className="channelName_comment">{"User 1"}</div>
                      <div className="commentTimingOther">{"6 months ago"}</div>
                    </div>

                    <div className="otherCommentSectionComment">
                      this is a nice project
                    </div>

                  </div>
               
                </div>

                <div className="neotubeSelfComment"> 
                  <img className='neotubeSelfCommentProfile' src="https://media.istockphoto.com/id/1087531642/vector/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-person-vector.jpg?s=612x612&w=0&k=20&c=FEppaMMfyIYV2HJ6Ty8tLmPL1GX6Tz9u9Y8SCRrkD-o=" alt="" srcset="" />
                 
                  <div className="otherCommentSection">
                    <div className="otherCommentSectionHeader">
                      <div className="channelName_comment">{"User 1"}</div>
                      <div className="commentTimingOther">{"6 months ago"}</div>
                    </div>

                    <div className="otherCommentSectionComment">
                      this is a nice project
                    </div>

                  </div>
               
                </div>

                <div className="neotubeSelfComment"> 
                  <img className='neotubeSelfCommentProfile' src="https://media.istockphoto.com/id/1087531642/vector/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-person-vector.jpg?s=612x612&w=0&k=20&c=FEppaMMfyIYV2HJ6Ty8tLmPL1GX6Tz9u9Y8SCRrkD-o=" alt="" srcset="" />
                 
                  <div className="otherCommentSection">
                    <div className="otherCommentSectionHeader">
                      <div className="channelName_comment">{"User 1"}</div>
                      <div className="commentTimingOther">{"6 months ago"}</div>
                    </div>

                    <div className="otherCommentSectionComment">
                      this is a nice project
                    </div>

                  </div>
               
                </div>
              </div>

            </div>


        </div>

      </div>

      <div className="videoSuggestions">

                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>


                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>


                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>


                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>


                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
                
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
            </div>

            <ToastContainer/>

      
    </div>
  )
}

export default Video
