import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // ملف CSS للتنسيقات
import FrontMaster from "../../FrontMaster";

const Login = ({ canResetPassword, status }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setErrors({}); // Reset errors before submission

    //     try {
    //         await axios.post("/login", formData);

    //         // Redirect to the intended page after successful login
    //         window.location.href = "/test";
    //     } catch (error) {
    //         if (error.response && error.response.data.errors) {
    //             setErrors(error.response.data.errors);
    //         }
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors before submission

        try {
            const response = await axios.post("/login", formData);

            const { role } = response.data;
            if (role === "admin") {
                window.location.href = "/admin";
            } else {
                window.location.href = "/";
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
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
                            style={{ height: "350px" }}
                            src="/images/premium_photo-1706140675031-1e0548986ad1.jpeg"
                            alt="Login Image"
                            className="img-fluid w-100"
                        />
                    </div>
                </div>

                {/* Login Form */}
                <div className="row login-container">
                    <div className="col-lg-6 mx-auto">
                        <h2 className="mb-4">Login</h2>
                        {status && <div className="alert alert-success">{status}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Username or Email Address *
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="text-danger">{errors.email}</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <p className="text-danger">{errors.password}</p>
                                )}
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <button type="submit" className="btn btn-custom">
                                    Log in
                                </button>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        name="remember"
                                        className="form-check-input"
                                        checked={formData.remember}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="form-check-label"
                                    >
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                            {canResetPassword && (
                                <a href="/forgot-password" className="text-decoration-none">
                                    Lost your password?
                                </a>

                            )}
                            <a href="/register" className="mx-2 text-bold">Dont have an account?</a>
                        </form>
                    </div>
                </div>
            </div>
        </FrontMaster>
    );
};

export default Login;
