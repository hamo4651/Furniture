import React from "react";
import "./Offer.css"; // ملف CSS للتنسيقات

const Offer = () => {
    return (
        <div className="container py-5 w-50">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <a href="/getofferproducts">
                    <div className="product">
                        <img
                            src="/images/special-offer-banner-label-icon-with-megaphone-flat-design-illustration-on-white-background-vector.jpg"
                            alt="Recycled Metal"
                            className="img-fluid"
                        />
                        <div className="product-text">
                            <h5 className="">SPECIAL OFFER</h5>
                            <p>Recycled metal</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div className="col-md-6 mb-4">
                    <a href="/shop">
                    <div className="product">
                        <img
                            src="/images/top_pick.jpg"
                            alt="Custom Woodwork"
                            className="img-fluid"
                        />
                        <div className="product-text">
                            <h5>Shop</h5>
                            <p>Check Our Products</p>
                        </div>
                    </div>
                    </a>
                </div>
              
            </div>
        </div>
    );
};

export default Offer;
