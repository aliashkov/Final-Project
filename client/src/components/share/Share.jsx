import React from 'react';
import './share.css'
import { PermMedia } from '@mui/icons-material';


const Share = () => {
    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src="/assets/person/2.jpg" alt="" />
                    <input
                        placeholder='Input yput thoughts'
                        className="shareInput"
                    />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareIcon'/>
                            <span className='shareOptionText'>Photo</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Share;