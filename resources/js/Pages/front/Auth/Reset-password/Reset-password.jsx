import React, { useState } from "react";
import axios from "axios";
import "./Reset-password.css"; // ملف CSS للتنسيقات
import FrontMaster from "../../FrontMaster";

const ResetPassword = ({ email, token }) => {
    const [formData, setFormData] = useState({
        email: email || "",
        token: token || "",
        password: "",
        password_confirmation: "",
    });

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const response = await axios.post("/reset-password", formData);
            setMessage(response.data.message);
            window.location.href = "/login";
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setError(err.response.data.errors);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
        window.location.href = "/login";
    };

    return (
        <FrontMaster>

        <div className="container">
            {/* Section Image */}
            <div className="row">
                <div className="col-12">
                    <img
                        src="your-image.jpg"
                        alt="Reset Password Image"
                        className="img-fluid w-100"
                    />
                </div>
            </div>

            {/* Reset Password Form */}
            <div className="row reset-password-container">
                <div className="col-lg-6 mx-auto">
                    <h2 className="mb-4">Reset Password</h2>
                    <p className="mb-4">Enter your new password below to reset it.</p>
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                New Password *
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your new password"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password_confirmation" className="form-label">
                                Confirm Password *
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                placeholder="Confirm your new password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-custom">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </FrontMaster>

    );
};

export default ResetPassword;
