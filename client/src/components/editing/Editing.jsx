import React from 'react';
import './editing.css'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist"
import { PermMedia, Cancel } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { UploadFile } from '../../services/uploadApi';
import { changeUser } from '../../services/userApi';
import { useDispatch } from 'react-redux';

export const Editing = () => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    const { user } = useSelector(state => state.userReducer);

    const username = useRef();
    const city = useRef();
    const country = useRef();
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault();
        const editUser = {
            userId: user._id,
            city : city.current.value,
            country : country.current.value,
            password : password,
            passwordConfirm : passwordConfirm
        };
        const data = new FormData();
        if (file) {
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            editUser.profilePicture = fileName;
            try {
                await UploadFile(data , user)
            } catch (err) { }
        }
        try {
            await changeUser(editUser, user._id)
            localStorage.setItem("user", JSON.stringify({
                ...user,
                ...editUser
            }))
            navigate('/');
           
        } catch (err) { }
    };

    return (
        <>
            <div className="editing">
                <div className="editingWrapper">
                    <div className="editingLeft">
                        <h3 className="editingLogo">Editing User</h3>
                        <div className="editingOptions">
                            <label htmlFor="file" className="editingOption">
                                <PermMedia htmlColor='tomato' className='editingIcon' />
                                <span className='editingOptionText'>Profile Picture</span>
                                <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                            </label>
                        </div>
                    </div>
                    <div className="editingRight">
                        <form className="editingBox" onSubmit={submitHandler}>
                            {file && (
                                <div className="editingImgContainer">
                                    <img className="editingImg" src={URL.createObjectURL(file)} alt="" />
                                    <Cancel className="editingCancelImg" onClick={() => setFile(null)} />
                                </div>
                            )}
                            {!file && (
                                <div className="editingImgContainer">
                                    <img className='editingImg' src={PUBLIC_FOLDER + "person/noAvatar.png"} alt="" />
                                </div>
                            )}
                            <input placeholder="City" ref={city} className="editingInput" />
                            <input placeholder="Country" ref={country} className="editingInput" />
                            <input placeholder="Password" required minLength="6" onChange={e => setPassword(e.target.value)} type="password" className="editingInput" />
                            <input placeholder="Password Confirm" required minLength="6" onChange={e => setPasswordConfirm(e.target.value)} type="password" className="editingInput" />
                            <div className='passwordsMessageWrapper'>
                                <PasswordChecklist
                                    rules={["minLength", "match"]}
                                    minLength={6}
                                    value={password}
                                    valueAgain={passwordConfirm}
                                    messages={{
                                        minLength: "Password length less than 6 symbols",
                                        match: "Password don't match",
                                    }}
                                />
                            </div>
                            <button className="editingButton" type="submit">Change Data</button>
                        </form>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Editing;