import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./register.css";
import Error from '../../components/error';
import { register } from '../../services/auth';

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();//prevents refresh
        if (username.trim() !== "" && password.trim() !== "" && email.trim() !== "") {
            try {
                const result = await register(username, email, password);
                result && navigate("/login");
            } catch (error) {
                setError("Uh Oh! Unable to sign up. Please try again.");
            }
        }
    }

    return (
        <div className="register">
            <span className="register-title">
                Register
            </span>
            {error && <Error message={error} setError={setError} />}
            <form className="register-form" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    className="register-input"
                    placeholder="Enter your username"
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    type="text"
                    className="register-input"

                    placeholder="Enter your email"
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    className="register-input"
                    placeholder="Enter your password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="register-button" type="submit">
                    Register
                </button>
            </form>
        </div>
    )
}
