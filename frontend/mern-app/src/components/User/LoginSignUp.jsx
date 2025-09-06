import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../action/userAction";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const LoginSignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector((state) => state.user) || {};

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            setSuccess("Login successful! Redirecting...");
            setTimeout(() => navigate("/"), 1500);
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess("");
        dispatch(login(formData.email, formData.password));
    };

    return (
        <div className="auth-container">
            <Helmet>
                <title>Login | E-Commerce</title>
            </Helmet>
            
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Sign in to continue</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-error">{error}</div>}
                    {success && <div className="auth-success">{success}</div>}

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="auth-loader">Logging In...</span>
                        ) : (
                            "Login"
                        )}
                    </button>

                    <div className="auth-footer">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginSignUp;