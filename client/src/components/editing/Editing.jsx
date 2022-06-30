import React from 'react';
import './editing.css'
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist"
import { PermMedia, Cancel } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { UploadFile } from '../../services/uploadApi';
import { changeUser } from '../../services/userApi';
import { useDispatch } from 'react-redux';
import { LoginSuccessUser } from '../../actions/userAction';
import { changeFilterPosts } from '../../actions/findPostsAction';
import { AmountAddedPosts } from '../../actions/isAllPostsAction';
import { io } from 'socket.io-client'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Editing = () => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    const { user } = useSelector(state => state.userReducer);

    const username = useRef();
    const city = useRef();
    const country = useRef();
    const socket = useRef();
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [file, setFile] = useState(null);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date());


    useEffect(() => {
        socket.current = io("ws://localhost:8900");

    }, [socket]);

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
        })
    }, [user, socket])


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            alert("Passwords doesn't match")
        }
        else {
            const editUser = {
                userId: user._id,
                username: username.current.value,
                city: city.current.value,
                country: country.current.value,
                password: password,
                passwordConfirm: passwordConfirm,
                isHidden: visible,
                birthDate : startDate
            };
            const data = new FormData();
            if (file) {
                const fileName = Date.now() + file.name;
                data.append("name", fileName);
                data.append("file", file);
                editUser.profilePicture = fileName;
                try {
                    await UploadFile(data, user)
                } catch (err) { }
            }
            try {
                await changeUser(editUser, user._id)
                localStorage.setItem("user", JSON.stringify({
                    ...user,
                    ...editUser
                }))

                dispatch(LoginSuccessUser({ ...user, ...editUser }))
                socket.current.emit("refreshPost");
                socket.current.emit("changeName", {
                    oldName: user.username,
                    newName: username.current.value,
                });

                dispatch(changeFilterPosts(""))
                dispatch(AmountAddedPosts())
                navigate(`/profile/${username.current.value}`);


            } catch (err) {
                if (err.code === "ERR_BAD_RESPONSE")
                    alert("This user already exists")
                else
                    alert(err.response.data)
            }
        }

    };



    const changeVisibility = () => {
        setVisible(!visible)

    }

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
                                <label htmlFor="file" className="editingOption">
                                    <div className="editingImgContainer">
                                        <img className='editingImg' src={PUBLIC_FOLDER + "person/noAvatar.png"} alt="" />
                                    </div>
                                </label>

                            )}
                            <div className='form_inputs'>
                                <input placeholder="Name" onKeyPress={(event) => {
                                    if (!/[a-zA-Z0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} ref={username} className="editingInput" />
                                <input placeholder="City" onKeyPress={(event) => {
                                    if (!/[a-zA-Z]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} 
                                ref={city} className="editingInput" />
                                <input placeholder="Country" onKeyPress={(event) => {
                                    if (!/[a-zA-Z0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} ref={country} className="editingInput" />
                                <DatePicker placeholder="Password"  className="editingInputDate" selected={startDate} onChange={(date) => setStartDate(date)} />
                                <input placeholder="Password" required minLength="6" onChange={e => setPassword(e.target.value)} type="password" className="editingInput" />
                                <input placeholder="Password Confirm" required minLength="6" onChange={e => setPasswordConfirm(e.target.value)} type="password" className="editingInput" />
                            </div>

                            <label className='editingCheckbox'>
                                <input className="editingCheckbox" type="checkbox" onClick={changeVisibility} />
                                Allowed Friends
                            </label>
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