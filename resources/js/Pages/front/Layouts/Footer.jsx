import React from "react";
import "./Footer.css"; // استيراد ملف CSS الخاص بالفوتر

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h4>Umeå</h4>
                        <p>
                            Welcome to a place of refinement and beauty. This is Umeå, a WP gem we made for all furniture stores & brands.
                        </p>
                        <ul className="social-links d-flex">
                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fab fa-behance"></i></a></li>
                            <li><a href="#"><i className="fab fa-dribbble"></i></a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h4>Studio</h4>
                        <ul>
                            <li><a href="#">Visit our Store</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Our Blog</a></li>
                            <li><a href="#">Craftsmanship</a></li>
                            <li><a href="#">Apply For a Job</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h4>Shopping</h4>
                        <ul>
                            <li><a href="#">Online Payments</a></li>
                            <li><a href="#">Gift Cards</a></li>
                            <li><a href="#">Return Policy</a></li>
                            <li><a href="#">Furniture Assembling</a></li>
                            <li><a href="#">Shipping Methods</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h4>Payment Methods</h4>
                        <p>Select one of many supported payment providers from the list below.</p>
                        <div className="payment-methods d-flex justify-content-center">
                            <a href="#" className=""><i className="fab fa-cc-mastercard"></i></a>
                            <a href="#"><i className="fab fa-cc-paypal"></i></a>
                            <a href="#"><i className="fab fa-cc-visa"></i></a>
                            <a href="#"><i className="fab fa-cc-discover"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
