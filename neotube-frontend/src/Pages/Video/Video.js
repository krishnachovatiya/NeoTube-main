import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Video.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from './../../useContext';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};



const Video = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [isCommentFocused, setIsCommentFocused] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  const { 
    isLoggedIn, 
    userDetails, 
    userProfilePic 
  } = useUserContext();

  const defaultProfilePicture = 
    'https://media.istockphoto.com/id/1087531642/vector/male-face-silhouette-or-icon-man-avatar-profile-unknown-or-anonymous-person-vector.jpg?s=612x612&w=0&k=20&c=FEppaMMfyIYV2HJ6Ty8tLmPL1GX6Tz9u9Y8SCRrkD-o=';

  const currentUserProfilePic = useMemo(() => 
    userProfilePic || defaultProfilePicture, 
    [userProfilePic]
  );

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/video/${id}`
        );
        const videoData = response.data.data;
        setVideo(videoData);

        const likes = videoData.videoEngagement?.filter(
          (e) => e.engagementType === 'LIKE'
        ).length || 0;
        const dislikes = videoData.videoEngagement?.filter(
          (e) => e.engagementType === 'DISLIKE'
        ).length || 0;
        setLikeCount(likes);
        setDislikeCount(dislikes);

        if (isLoggedIn && userDetails) {
          const userEngagement = videoData.videoEngagement?.find(
            (e) => e.userId === userDetails.id
          );
          if (userEngagement) {
            setUserLiked(userEngagement.engagementType === 'LIKE');
            setUserDisliked(userEngagement.engagementType === 'DISLIKE');
          }
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching video:', err);
        setError(`Failed to fetch video: ${err.message}`);
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id, isLoggedIn, userDetails]);

  const handleLike = useCallback(async () => {
    if (!isLoggedIn) {
      toast.info('Sign in to like videos', {
        position: 'top-center',
        autoClose: 1000,
      });
      return;
    }
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `http://localhost:3000/api/v1/video/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const { liked, likeCount: newLikeCount } = response.data.data;
      setLikeCount(newLikeCount);
      setUserLiked(liked);
      
      // Toggle dislike if needed
      if (liked && userDisliked) {
        setUserDisliked(false);
        setDislikeCount((prev) => Math.max(0, prev - 1));
      }
      
      toast.success(liked ? 'Video liked' : 'Like removed', {
        position: 'top-right',
        autoClose: 1000,
      });
    } catch (err) {
      console.error('Error liking video:', err);
      toast.error('Failed to register like', {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  }, [id, isLoggedIn, userDisliked]);

  const handleDislike = useCallback(async () => {
    if (!isLoggedIn) {
      toast.info('Sign in to dislike videos', {
        position: 'top-center',
        autoClose: 1000,
      });
      return;
    }
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `http://localhost:3000/api/v1/video/${id}/dislike`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const { disliked, dislikeCount: newDislikeCount } = response.data.data;
      setDislikeCount(newDislikeCount);
      setUserDisliked(disliked);
      
      // Toggle like if needed
      if (disliked && userLiked) {
        setUserLiked(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
      }
      
      toast.success(disliked ? 'Video disliked' : 'Dislike removed', {
        position: 'top-right',
        autoClose: 1000,
      });
    } catch (err) {
      console.error('Error disliking video:', err);
      toast.error('Failed to register dislike', {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  }, [id, isLoggedIn, userLiked]);

  const handleCommentSubmit = useCallback(async () => {
    if (!isLoggedIn) {
      toast.info('Sign in to comment', {
        position: 'top-center',
        autoClose: 1000,
      });
      return;
    }
    
    if (!commentText.trim()) {
      toast.warn('Comment cannot be empty!', {
        position: 'top-center',
        autoClose: 1000,
      });
      return;
    }
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `http://localhost:3000/api/v1/video/${id}/comment`,
        { content: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const newComment = response.data.data;
      const commentWithUserDetails = {
        ...newComment,
        user: {
          id: userDetails.id,
          username: userDetails.username,
          profilePicture: userDetails.profilePicture || defaultProfilePicture,
        },
      };
      
      setVideo((prevVideo) => ({
        ...prevVideo,
        comments: [...prevVideo.comments, commentWithUserDetails],
      }));
      
      setCommentText('');
      setIsCommentFocused(false);
      
      toast.success('Comment added!', {
        position: 'top-center',
        autoClose: 1000,
      });
    } catch (err) {
      console.error('Error submitting comment:', err);
      toast.error('Failed to add comment', {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  }, [commentText, id, isLoggedIn, userDetails]);

  if (loading) return <div className="video">Loading video...</div>;
  if (error) return <div className="video">{error}</div>;
  if (!video) return <div className="video">Video not found.</div>;

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now - date;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);
  
    if (diffInSeconds < 1) {
      return 'Just now';
    }
    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    }
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    }
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  };


  return (
    <div className="video">
      <div className="videoPostSection">
        <div className="video_neoTube">
          <video className="video_neoTube_videos" width="400" controls autoPlay>
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        </div>
        <div className="videoAbout">
          <div className="videoTitle">{video.title}</div>
          <div className="neoTube_video_ProfileBlock">
            <div className="neoTube_video_ProfileBlockLeft">
              <Link
                to={`/user/${video.user.id}`}
                className="ProfileBlockLeftImages"
              >
                <img
                  className="ProfileBlockLeftImage"
                  src={video.user.profilePicture}
                  alt={video.user.username}
                />
              </Link>
              <div className="video_subsView">
                <div className="neoTubeProfileName">{video.user.username}</div>
                <div className="neoTubeProfileSubs">
                  {formatDate(video.createdAt)}
                </div>
              </div>
              <div className="subsButton">Subscribe</div>
            </div>
            <div className="neoTube_video_LikeBlock">
              <div
                className={`neoTube_video_LikeBlock_Like ${
                  userLiked ? 'active' : ''
                }`}
                onClick={handleLike}
                style={{
                  cursor: 'pointer',
                  color: userLiked ? '#1976d2' : 'inherit',
                }}
              >
                <ThumbUpIcon />
                <div className="neoTube_video_LikeBlock_NoOfLikes">
                  {likeCount}
                </div>
              </div>

              <div className="likesDivider"></div>
              <div
                className={`neoTube_video_LikeBlock_Like ${
                  userDisliked ? 'active' : ''
                }`}
                onClick={handleDislike}
                style={{
                  cursor: 'pointer',
                  color: userDisliked ? '#1976d2' : 'inherit',
                }}
              >
                <ThumbDownIcon />
                <div className="neoTube_video_LikeBlock_NoOfLikes">
                  {dislikeCount}
                </div>
              </div>
            </div>
          </div>
          <div className="neotube_video_about">
            <div>{formatDate(video.createdAt)}</div>
            <div>{video.description}</div>
          </div>
          <div className="neotubeCommentSection">
            <div className="neotubeCommentSectionTitle">
              {video.comments.length} comment
              {video.comments.length !== 1 ? 's' : ''}
            </div>
            <div className="neotubeSelfComment">
              <img
                className="neotubeSelfCommentProfile"
                src={
                  localStorage.getItem('userProfilePic') ||
                  defaultProfilePicture
                }
                alt="User Profile"
              />
              <input
                type="text"
                className="addACommentInput"
                placeholder="Add a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onFocus={(e) => {
                  if (!isLoggedIn) {
                    toast.info('Sign in to comment', {
                      position: 'top-center',
                      autoClose: 1000,
                    });
                    e.target.blur();
                    return;
                  }
                  setIsCommentFocused(true);
                }}
              />
              {isCommentFocused && (
                <>
                  <button
                    className="cancelComment"
                    onClick={() => {
                      setCommentText('');
                      setIsCommentFocused(false);
                    }}
                    >
                    Cancel
                  </button>
                  <button
                    className="cancelComment"
                    onClick={handleCommentSubmit}
                  >
                    Comment
                  </button>
                </>
              )}
            </div>

            <div className="neotubeOtherComments">
              {video.comments.map((comment) => (
                <div className="neotubeSelfComment" key={comment.id}>
                  <img
                    className="neotubeSelfCommentProfile"
                    src={
                      comment.user?.profilePicture || defaultProfilePicture
                    }
                    alt={comment.user?.username || 'Anonymous'}
                  />
                  <div className="otherCommentSection">
                    <div className="otherCommentSectionHeader">
                      <div className="channelName_comment">
                        {comment.user?.username || 'Unknown User'}
                      </div>
                      <div className="commentTimingOther">
                        {formatTimeAgo(comment.createdAt)}
                      </div>
                    </div>
                    <div className="otherCommentSectionComment">
                      {comment.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="videoSuggestions">
        {/* Recommended videos section - you could fetch related videos here */}
        <div className="videoSuggestionsBlock">
          <div className="video_suggestion_thumbnail">
            <img
              src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              className="video_suggestion_thumbnail_img"
              alt="Cricket video thumbnail"
            />
          </div>
          <div className="video_suggestions_About">
            <div className="video_suggestions_About_title">
              T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india
            </div>
            <div className="video_suggestions_About_Profile">Cricket 320</div>
            <div className="video_suggestions_About_Profile">
              136K views · 1 day ago
            </div>
          </div>
        </div>
        {/* More suggested videos would go here */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Video;

