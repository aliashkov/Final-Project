import React, { useRef, useState } from 'react';
import './share.css'
import { PermMedia } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { uploadFile } from '../../services/uploadApi';
import { addPost } from '../../services/postsApi';


const Share = () => {

    const { user } = useSelector(state => state.authReducer)
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    const description = useRef()
    const [file, setFile] = useState(null)


    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            description: description.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try {
                await uploadFile(data);
            } catch (err) { }
        }
        try {
            await addPost(newPost)
            window.location.reload()
        } catch (err) { }
    };


    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" />
                    <input
                        placeholder='Input your thoughts'
                        className="shareInput"
                        ref={description}
                    />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'>Photo</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                    </div>
                    <button className='shareButton' type="submit"> Share </button>
                </form>
            </div>
        </div>
    )
}

export default Share;