import React, { useEffect } from "react";
import "./AboutSection.css"; // ملف CSS مخصص للتنسيقات
import FrontMaster from "../FrontMaster";

const AboutSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // مدة الأنيميشن بالميلي ثانية
            offset: 200, // المسافة قبل بدء الأنيميشن
        });
    }, []);

    return (
        <FrontMaster>
            <div className="">
            <div className="row">
                    <div className="col-12">
                        <img
                            style={{ height: "350px", width: "100%" }}
                            src="/images/premium_photo-1706140675031-1e0548986ad1.jpeg"
                            alt="Login Image"
                            className="img-fluid w-100"
                        />
                    </div>
                </div>

                <div className="container">
                <div className="container about-section">
                    <div className="row align-items-center mb-5">
                        <div className="col-md-6">
                            <img
                                data-aos="fade-left"
                                src="/images/discover-beautiful-elegant-wood-furniture-stunning-furniture-images-included_629704-1400.png"
                                alt="Image 1"
                                className="about-image"
                            />
                        </div>
                        <div className="col-md-6 about-text">
                            <h3>About Our Collections</h3>
                            <h2>Experience new way of designing</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Enim ut sem viverra aliquet eget sit amet.
                            </p>
                            <a href="#">Read More</a>
                        </div>
                    </div>

                    <div className="row align-items-center mb-5">
                        <div className="col-md-6 order-md-2">
                            <img
                                data-aos="fade-left"
                                src="/images/discover-beautiful-elegant-wood-furniture-stunning-furniture-images-included_629704-1400.png"
                                alt="Image 2"
                                className="about-image"
                            />
                        </div>
                        <div className="col-md-6 order-md-1 about-text">
                            <h3>About Our Shop</h3>
                            <h2>Experience the shop</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Enim ut sem viverra aliquet eget sit amet.
                            </p>
                            <a href="#">Read More</a>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <img
                                data-aos="fade-left"
                                src="/images/discover-beautiful-elegant-wood-furniture-stunning-furniture-images-included_629704-1400.png"
                                alt="Image 3"
                                className="about-image"
                            />
                        </div>
                        <div className="col-md-6 about-text">
                            <h3>About Our Values</h3>
                            <h2>Delivering Quality and Innovation</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Enim ut sem viverra aliquet eget sit amet.
                            </p>
                            <a href="#">Read More</a>
                        </div>
                    </div>
                </div>
                </div>

            </div>
        </FrontMaster>
    );
};

export default AboutSection;
