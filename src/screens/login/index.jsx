import React, { useContext, useRef, useState } from 'react';
import { Context } from '../../context/Context';
import { LoadingContext } from '../../context/LoadingContext';
import "./login.css";
import Error from '../../components/error';
import { login } from '../../services/auth';

export default function Login() {
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);
    const { loadingShow, loadingHide } = useContext(LoadingContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;
        if (username.trim() !== "" && password.trim() !== "") {
            loadingShow();
            dispatch({ type: "LOGIN_START" });
            try {
                const result = await login(usernameRef.current.value, passwordRef.current.value);
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: result.user
                });
            } catch (error) {
                dispatch({ type: "LOGIN_FAILURE" });
                setError("Uh Oh! Unable to sign in. Please try again.");
            }
            finally {
                loadingHide();
            }
        }
        else
            setError("Enter valid credentials!");
    }

    return (
        <div className="login">
            <span className="login-title">
                Login
            </span>
            {error && <Error message={error} setError={setError} />}
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    className="login-input"
                    placeholder="Enter your username"
                    ref={usernameRef}
                />
                <label>Password</label>
                <input
                    type="password"
                    className="login-input"
                    placeholder="Enter your password"
                    ref={passwordRef}
                />
                <button className="login-button" type="submit" disabled={isFetching}>
                    {isFetching ? "Logging in.." : "Login"}
                </button>
            </form>
        </div>
    )
}
