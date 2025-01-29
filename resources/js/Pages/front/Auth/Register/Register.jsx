import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; // ملف CSS للتنسيقات
import FrontMaster from "../../FrontMaster";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone_number: "",
        profile_image: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profile_image") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors before submission

        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            await axios.post("/register", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Redirect to dashboard after successful registration
            window.location.href = "/dashboard";
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

                {/* Registration Form */}
                <div className="row login-container">
                    <div className="col-lg-6 mx-auto">
                        <h2 className="mb-4">Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                />
                                {errors.name && <p className="text-danger">{errors.name}</p>}
                            </div>
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
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-danger">{errors.email}</p>}
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
                                {errors.password && <p className="text-danger">{errors.password}</p>}
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
                                    placeholder="Confirm your password"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone_number" className="form-label">
                                    Phone Number *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone_number"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone_number && <p className="text-danger">{errors.phone_number}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="profile_image" className="form-label">
                                    Profile Image *
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="profile_image"
                                    name="profile_image"
                                    onChange={handleChange}
                                />
                                {errors.profile_image && <p className="text-danger">{errors.profile_image}</p>}
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <button type="submit" className="btn btn-custom">
                                    Register
                                </button>
                            </div>
                        </form>
                        <a className="text-center" href="/login"> Already have an account? Login</a>
                    </div>
                </div>
            </div>
        </FrontMaster>
    );
};

export default Register;
