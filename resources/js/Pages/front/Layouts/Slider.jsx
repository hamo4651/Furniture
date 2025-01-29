import React from "react";
import "./Slider.css"; // ملف CSS إذا احتجت لتنسيق إضافي

const Slider = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src="/images/premium_photo-1706140675031-1e0548986ad1.jpeg"
                        className="d-block w-100"
                        alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Better interiors</h5>
                        <p>The perfect place for every contemporary furniture store and manufacturer. This is Umeå.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img
                        src="/images/discover-beautiful-elegant-wood-furniture-stunning-furniture-images-included_629704-1400.png"
                        className="d-block w-100"
                        alt="..."
                    />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Superior living</h5>
                        <p>Explore our unique designs and products.</p>
                    </div>
                </div>
            </div>
            <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
};

export default Slider;
