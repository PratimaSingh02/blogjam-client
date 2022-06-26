import React, { useContext, useState } from 'react';
import "./settings.css";
import { Context } from '../../context/Context';
import { LoadingContext } from '../../context/LoadingContext';
import Error from "../error";
import Success from "../success";
import { updateUser } from '../../services/user';
import { uploadImage } from '../../services/image';

export default function Settings() {
    const { user, dispatch } = useContext(Context);
    const { loadingShow, loadingHide } = useContext(LoadingContext);
    const [userState, setUserState] = useState({ ...user, password: "" });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleImageUpdate = async (e) => {
        if (e.target.files[0]) {
            loadingShow();
            try {
                const filename = await uploadImage(e.target.files[0]);
                setUserState({ ...userState, profilePicture: filename });
            } catch (error) {
                setError("Unable to update image! Try again.");
            }
            finally {
                loadingHide();
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userState.password.trim() === "" || userState.email.trim() === "" || userState.username.trim() === "") {
            setError("Enter valid details!");
            return;
        }
        loadingShow();
        try {
            const result = await updateUser(user._id, userState.username, userState.email,
                userState.password, userState.profilePicture);
            dispatch({ type: "UPDATE", payload: result });
            setSuccess("Profile updated successfully!");
            setError(false);
        } catch (error) {
            setError("Unable to update account details! Try again.");
            setSuccess(false);
        }
        finally {
            loadingHide();
        }
    }

    return (
        <div className="settings">
            <div className="settings-wrapper">
                <span className="settings-update-title">
                    Update Your Account
                </span>
                {
                    error && <Error message={error} setError={setError} />
                }
                {
                    success && <Success message={success} setSuccess={setSuccess} />
                }
                <form className="settings-form" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settings-profile-pic">
                        {userState.profilePicture && <img
                            src={process.env.REACT_APP_PUBLIC_FOLDER_URL + userState.profilePicture}
                            alt=""
                        />}
                        <label htmlFor="file-input" className="settings-update-photo-container">
                            <i className="settings-profile-pic-icon fa-solid fa-circle-user" />
                            {userState.profilePicture ? "Update image" : "Upload image"}
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            style={{ display: "none" }}
                            onChange={handleImageUpdate}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={userState.username}
                        onChange={e => setUserState({ ...userState, username: e.target.value })}
                    />
                    <label >Email</label>
                    <input
                        type="email"
                        value={userState.email}
                        onChange={e => setUserState({ ...userState, email: e.target.value })}
                    />
                    <label>New Password</label>
                    <input
                        type="password"
                        value={userState.password}
                        onChange={e => setUserState({ ...userState, password: e.target.value })}
                    />
                    <button className="settings-submit" type="submit">
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}
