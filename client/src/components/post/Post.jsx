import React from 'react';
import './post.css'
import { MoreVert } from '@mui/icons-material';


const Post = () => {
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className='postProfileImg' src="/assets/person/2.jpg" alt="" />
                        <span className="postUsername">Artyom Liashkou</span>
                        <span className="postDate">7 mins ago</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">Some text</span>
                    <img  className="postImg" src="/assets/post/1.jpeg" alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className='likeIcon' src="assets/heart.png" alt="" />
                        <span className="likeCounter">32 liked</span>

                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">9 comments</span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;