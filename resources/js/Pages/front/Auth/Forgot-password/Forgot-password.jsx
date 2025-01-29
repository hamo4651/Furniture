import React, { useState } from "react";
import axios from "axios";
import "./Forgot-password.css"; // ملف CSS للتنسيقات
import FrontMaster from "../../FrontMaster";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            const response = await axios.post("/forgot-password", { email });
            setMessage(response.data.message);
        } catch (err) {
            if (err.response && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <FrontMaster>

        <div className="container">
            {/* Section Image */}
            <div className="row">
                <div className="col-12">
                    <img
                            src="https://via.placeholder.com/1920x1080"
                            alt="Forgot Password Image"
                        className="img-fluid w-100"
                    />
                </div>
            </div>

            {/* Forgot Password Form */}
            <div className="row forgot-password-container">
                <div className="col-lg-6 mx-auto">
                    <h2 className="mb-4">Forgot Password</h2>
                    <p className="mb-4">
                        Enter your email address, and we’ll send you a link to reset your password.
                    </p>
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
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-custom">
                            Send Reset Link
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </FrontMaster>

    );
};

export default ForgotPassword;
