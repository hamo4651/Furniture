import React from "react";
import "./Product.css"; // ملف CSS للتنسيقات

const Product = ({ products }) => {
    return (
        <div className="container py-5 text-center">
            <h3 className="text-uppercase text-bold text-dark">Browse Our Items</h3>
            <h2>Ideal for your home</h2>
            <hr style={{ width: "50%", margin: "20px auto" }} />
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-3 col-sm-6 mb-4" key={product.id}>
                        <div className="item">
                            <img
                                                        src={`http://127.0.0.1:8000/images/product_image/${product.images[0].image}`}
                                                        alt={product.name}
                            />
                            <div className="overlay">
                                <button className="button">
                                    <i className="fas fa-heart"></i>
                                </button>
                                <button className="button">
                                    <i className="fas fa-shopping-cart"></i>
                                </button>
                            </div>
                            <p className="text-dark">
                                {product.name}
                                <br />${product.price}
                                <br />{product.category}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
