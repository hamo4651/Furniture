import React, { useState, useEffect } from "react";
import "./Contact.css"; // ملف CSS الخاص بالتنسيقات
import FrontMaster from "../FrontMaster";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react"; // استيراد usePage

const Contact = () => {
    const { props } = usePage(); // الوصول إلى الـ props المرسلة من الـ backend
    const { status } = props; // استخراج الرسالة من الـ props

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            alert("Please fill in all fields.");
            return;
        }

        Inertia.post(route("admin.feedback.store"), formData, {
            onSuccess: () => {
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });
            },
            onError: (errors) => {
                alert("An error occurred. Please try again.");
            },
        });
    };

    // عرض الرسالة إذا كانت موجودة
    useEffect(() => {
        if (status) {
            alert(status); // أو يمكنك استخدام toast أو أي طريقة أخرى لعرض الرسالة
        }
    }, [status]);

    return (
        <>
            <FrontMaster>
                {/* خريطة Google */}
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.15408460445!2d16.860495341282163!3d58.59019754981907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9038b12f43df%3A0x0!2z0JzQvtC80LjQvdC40YbQsA!5e0!3m2!1sen!2s!4v1696071773241!5m2!1sen!2s"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>

                <div className="container">
                    {/* قسم التواصل */}
                    <div className="contact-section">
                        <div className="row">
                            {/* الفورم */}
                            <div className="col-md-6 contact-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Your Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            placeholder="Your Message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-dark"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>

                            {/* معلومات التواصل */}
                            <div className="col-md-6 contact-info">
                                <h3>Send us a message</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, comp uting of ore
                                    et dolore ma antemo enim. Quam quisque id
                                    diam.
                                </p>
                                <div className="info-item">
                                    <strong>Email:</strong> Umea@example.com
                                </div>
                                <div className="info-item">
                                    <strong>Address:</strong> Mäster Samuelsgatan
                                    48A, Sweden
                                </div>
                                <div className="info-item">
                                    <strong>Phone:</strong> +668 66 448 6452 99
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FrontMaster>
        </>
    );
};

export default Contact;
