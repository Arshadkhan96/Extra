import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../action/userAction";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const RegisterUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector((state) => state.user) || {};

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            setSuccess("Registration successful! Redirecting...");
            setTimeout(() => navigate("/"), 2000);
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
        dispatch(register(formData.name, formData.email, formData.password));
    };

    return (
        <div className="auth-container">
            <Helmet>
                <title>Register | E-Commerce</title>
            </Helmet>
            
            <div className="auth-card">
                <h2>Create Account</h2>
                <p className="auth-subtitle">Join us to start shopping</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-error">{error}</div>}
                    {success && <div className="auth-success">{success}</div>}

                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

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
                            placeholder="Create a password"
                            minLength="6"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="auth-loader">Registering...</span>
                        ) : (
                            "Register"
                        )}
                    </button>

                    <div className="auth-footer">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;