import React, { useState } from "react";
import "./ProductDetails.css"; // Your CSS file
import FrontMaster from "../FrontMaster";
import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/react";

const ProductDetails = ({ product }) => {
    //   const handleAddToCart = (productId) => {
    //         Inertia.post(
    //             route("cart.store"),
    //             {
    //                 product_id: productId, // استخدام المعامل productId
    //                 quantity: 1, // الكمية الافتراضية (يمكن تغييرها)
    //             },
    //             {
    //                 onSuccess: () => {
    //                     alert("Product added to cart successfully!"); // عرض رسالة نجاح
    //                 },
    //                 onError: (errors) => {
    //                     alert("An error occurred. Please try again."); // عرض رسالة خطأ
    //                 },
    //             }
    //         );
    //     };
    const { auth } = usePage().props; // جلب بيانات المستخدم من Inertia.js

    const { data, setData, post, processing, errors } = useForm({
        product_id: null,
        quantity: 1,
        price: 0,
    });
    const [formData, setFormData] = useState({
        rating: "5",
        message: "",
        name: "",
        email: auth?.user?.email,
        product_id: product.id,
    });

    const [error, setError] = useState({});
    // console.log(product);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDeleteReview = (reviewId) => {
        // Send DELETE request using Inertia
        Inertia.delete(route("admin.feedback.destroy", reviewId));
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        // Send POST request using Inertia
        Inertia.post(route("admin.feedback.store"), formData, {
            onError: (errorBag) => {
                setError(errorBag); // Update error messages if validation fails
            },
            onSuccess: () => {
                alert("Review submitted successfully!");
                setFormData({
                    rating: "5",
                    message: "",
                    name: "",
                    email: auth?.user?.email,
                    product_id: product.id,
                });
                setError({});
            },
        });
    };
    const handleAddToCart = (productId, discountedPrice, originalPrice) => {
        const priceToUse =
            discountedPrice < originalPrice ? discountedPrice : originalPrice;

        // setIsSubmitting(true);
        const updatedData = {
            ...data,
            product_id: productId,
            price: priceToUse,
        };

        // إرسال الطلب بعد تحديث البيانات
        setData(updatedData);
        console.log(updatedData);

        // إرسال النموذج
        post(route("cart.store"), {
            data: {
                product_id: productId,
                quantity: 1,
                price: priceToUse,
            },
            onSuccess: () => {
                alert("Product added to cart successfully!");
                // setIsSubmitting(false); // السماح بإرسال الطلبات بعد النجاح
            },
            onError: (errors) => {
                // setIsSubmitting(false); // السماح بإرسال الطلبات بعد النجاح

                console.error("Errors:", errors);
                alert("An error occurred. Please try again.");
            },
        });
    };
    const [loading, setLoading] = React.useState(false);

    const handleAddToFavorite = (productId) => {
        setLoading(true);
        Inertia.post(
            route("favorite.store"),
            {
                product_id: productId,
            },
            {
                onSuccess: () => {
                    setLoading(false);
                    alert("Product added to favorite successfully!");
                },
                onError: () => {
                    setLoading(false);
                    alert("An error occurred. Please try again.");
                },
            }
        );
    };
    return (
        <>
            <FrontMaster>
                {/* قسم المنتج */}
                <div className="container product-container">
                    <div className="row">
                        {/* الصور */}
                        <div className="col-md-6">
                            <div className="product-image mb-3">
                                <div className="row">
                                    {/* Large image */}
                                    <div className="col-12 mb-3">
                                        <img
                                            src={`http://127.0.0.1:8000/images/product_image/${product.images[0]?.image}`}
                                            alt="Product Image"
                                            className="img-fluid"
                                            style={{
                                                maxHeight: "500px",
                                                objectFit: "cover",
                                            }} // يمكنك تعديل الحجم كما تريد
                                        />
                                    </div>

                                    {/* Small images */}
                                    <div className="col-12">
                                        <div className="row">
                                            {product.images
                                                .slice(1)
                                                .map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="col-4 mb-3"
                                                    >
                                                        <img
                                                            src={`http://127.0.0.1:8000/images/product_image/${image.image}`}
                                                            alt={`Product Image ${
                                                                index + 1
                                                            }`}
                                                            className="img-fluid"
                                                            style={{
                                                                maxHeight:
                                                                    "150px",
                                                                objectFit:
                                                                    "cover",
                                                            }} // حجم الصور الصغيرة
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* التفاصيل */}
                        <div className="col-md-6">
    <div className="product-details p-6 bg-white shadow-lg rounded-2xl">
        {/* Product Name */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

        {/* Product Price */}
        <div className="price mb-4">
            {product.discounted_price < product.price ? (
                <p className="text-2xl font-semibold text-green-600">
                    <span className="line-through text-red-500 text-sm mr-3">
                        ${product.price}
                    </span>
                    ${product.discounted_price.toFixed(2)}
                </p>
            ) : (
                <p className="text-2xl font-semibold text-gray-800">
                    ${product.price}
                </p>
            )}
        </div>

        {/* Product Rating */}
        <div className="rating mb-4 flex items-center gap-2">
            <span className="text-yellow-400 text-lg">★★★☆☆</span>
            <span className="text-gray-600 text-sm">
                ({product.feed_backs.length} Reviews)
            </span>
        </div>

        {/* Product Description */}
        <p className="text-gray-700 mb-4">{product.description}</p>

        {/* Stock Status */}
        <p
            className={`font-semibold ${
                product.stock === 0
                    ? "text-red-600"
                    : "text-green-600"
            }`}
        >
            {product.stock === 0 ? "Out of stock" : "In stock"}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
            {/* Add to Favorite */}
            <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow transition ${
                    loading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600 text-white"
                }`}
                onClick={
                    !loading
                        ? () => handleAddToFavorite(product.id)
                        : undefined
                }
                disabled={loading}
            >
                <i className="fas fa-heart"></i> Add to Favorite
            </button>

            {/* Add to Cart */}
            <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition"
                onClick={() =>
                    handleAddToCart(
                        product.id,
                        product.discounted_price,
                        product.price
                    )
                }
            >
                <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>

        {/* Additional Details */}
        <ul className="list-unstyled mt-6 text-gray-700 space-y-2">
            {/* Uncomment when needed */}
            {/* <li>
                <strong>SKU:</strong> {product.sku}
            </li> */}
            {/* <li>
                <strong>Category:</strong> {product.category.name}
            </li> */}
        </ul>
    </div>
</div>

                    </div>
                </div>

                {/* قسم التابات */}
                <div className="container my-5">
                    <ul
                        className="nav nav-tabs"
                        id="productTabs"
                        role="tablist"
                    >
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="description-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#description"
                                type="button"
                                role="tab"
                                aria-controls="description"
                                aria-selected="true"
                            >
                                Description
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="info-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#info"
                                type="button"
                                role="tab"
                                aria-controls="info"
                                aria-selected="false"
                            >
                                Info
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="reviews-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#reviews"
                                type="button"
                                role="tab"
                                aria-controls="reviews"
                                aria-selected="false"
                            >
                                Reviews ({product.feed_backs.length})
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content" id="productTabsContent">
                        {/* Description Tab */}
                        <div
                            className="tab-pane fade show active"
                            id="description"
                            role="tabpanel"
                            aria-labelledby="description-tab"
                        >
                            <p className="mt-4">{product.description}</p>
                        </div>

                        {/* Info Tab */}
                        <div
                            className="tab-pane fade"
                            id="info"
                            role="tabpanel"
                            aria-labelledby="info-tab"
                        >
                            <ul className="mt-4">
                                <li>
                                    <strong>Name:</strong> {product.name} kg
                                </li>
                                <li>
                                    <strong>Price:</strong>{" "}
                                    ${product.price} 
                                </li>
                                {product.discounted_price &&<li>
                                    <strong>After Discount:</strong>{" "}
                                    ${product.discounted_price} 
                                </li>}
                            </ul>
                        </div>

                        {/* Reviews Tab */}
                        <div
                            className="tab-pane fade"
                            id="reviews"
                            role="tabpanel"
                            aria-labelledby="reviews-tab"
                        >
                            <div className="mt-4">
                                <h5 className="mb-4">
                                    {product.feed_backs.length} review{" "}
                                    {product.feed_backs.length > 1 ? "s" : ""}{" "}
                                    for {product.name}
                                </h5>
                                {product.feed_backs.map((review, index) => (
                                    <div
                                        key={index}
                                        className="d-flex position-relative align-items-start mb-4 p-3 border border-light rounded shadow-sm"
                                    >
                                        <img
                                            src={"/images/images.jpeg"}
                                            alt="Reviewer"
                                            className="rounded-circle me-3"
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover", // Ensures the image is not distorted
                                            }}
                                        />
                                        <div className="d-flex flex-column">

                                            <h6 className="mb-1">
                                                {review.name}
                                                <small className="text-muted ms-2">
                                                    {review.created_at.slice(
                                                        0,
                                                        10
                                                    )}
                                                </small>
                                            </h6>
                                            <div className="d-flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        className={`text-warning ${
                                                            star <=
                                                            review.rating
                                                                ? "fa fa-star"
                                                                : "fa fa-star-o"
                                                        }`}
                                                        style={{
                                                            fontSize: "18px",
                                                        }}
                                                    ></span>
                                                ))}
                                            </div>
                                            <p className="mt-2">
                                                {review.message}
                                            </p>
                                        </div>             
                                        {(auth?.user?.email === review.email|| auth?.user?.role === "admin")  && (  <button onClick={() => handleDeleteReview(review.id)} className="btn btn-dark btn-sm rounded 
                                              position-absolute top-1 end-1
                                              "><i className="fa fa-trash"></i></button>
                                        )}
                                    </div>
                                ))}
                       {auth?.user && (
                                  
                   

                                <div className="card shadow-sm rounded p-4 mt-5">
                                    <h5 className="mb-4">Add a Review</h5>
                                    <form onSubmit={handleSubmit}>
                                        {/* Rating Field */}
                                        <div className="mb-3">
                                            <label
                                                htmlFor="rating"
                                                className="form-label"
                                            >
                                                Rating:
                                            </label>
                                            <select
                                                id="rating"
                                                name="rating"
                                                value={formData.rating}
                                                onChange={handleChange}
                                                className={`form-select ${
                                                    error.rating
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                            >
                                                {[5, 4, 3, 2, 1].map(
                                                    (value) => (
                                                        <option
                                                            key={value}
                                                            value={value}
                                                        >
                                                            {value}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            {error.rating && (
                                                <div className="invalid-feedback">
                                                    {error.rating}
                                                </div>
                                            )}
                                        </div>

                                        {/* Review Field */}
                                        <div className="mb-3">
                                            <label
                                                htmlFor="message"
                                                className="form-label"
                                            >
                                                Review:
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                className={`form-control ${
                                                    error.message
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                rows="4"
                                            ></textarea>
                                            {error.message && (
                                                <div className="invalid-feedback">
                                                    {error.message}
                                                </div>
                                            )}
                                        </div>

                                        {/* Name Field */}
                                        <div className="mb-3">
                                            <label
                                                htmlFor="name"
                                                className="form-label"
                                            >
                                                Name:
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`form-control ${
                                                    error.name
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                            />
                                            {error.name && (
                                                <div className="invalid-feedback">
                                                    {error.name}
                                                </div>
                                            )}
                                        </div>

                                        {/* Email Field */}
                                        <div className="mb-4">
                                            <label
                                                htmlFor="email"
                                                className="form-label"
                                            >
                                                Email:
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                disabled
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`form-control ${
                                                    error.email
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                            />
                                            {error.email && (
                                                <div className="invalid-feedback">
                                                    {error.email}
                                                </div>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100 py-2"
                                        >
                                            Submit Review
                                        </button>
                                    </form>
                                </div>
                                     )}
                            </div>
                        </div>
                    </div>
                </div>
            </FrontMaster>
        </>
    );
};

export default ProductDetails;
