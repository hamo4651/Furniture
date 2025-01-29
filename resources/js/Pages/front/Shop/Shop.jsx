import "./Shop.css";
import FrontMaster from "../FrontMaster";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const Shop = () => {
    const {
        products = { data: [], from: 0, to: 0, total: 0, links: [] },
        filters,categories
    } = usePage().props;
console.log(categories);

    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = React.useState(false);

    const { data, setData, post, processing, errors } = useForm({
        product_id: null,
        quantity: 1,
        price: 0,
    });

    // Handle price filter
    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceRange((prevRange) => ({
            ...prevRange,
            [name]: value,
        }));
    };

    const handlePriceFilter = () => {
        Inertia.get(route("shop.getProducts"), {
            sort_by: filters?.sort_by || "",
            min_price: priceRange.min,
            max_price: priceRange.max,
            name: searchTerm,  // Changed to match controller expectation
            category_id: selectedCategory,
        });
    };

    // Handle search
    const handleSearch = () => {
        Inertia.get(route("shop.getProducts"), {
            name: searchTerm,  // Changed to match controller expectation
            category_id: selectedCategory,
            sort_by: filters?.sort_by || "",
            min_price: priceRange.min,
            max_price: priceRange.max,
        });
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setSelectedCategory(selectedCategoryId);
    console.log(selectedCategoryId);
    
        // Make the Inertia request with the updated category
        Inertia.get(route("shop.getProducts"), {
            category_id: selectedCategoryId,
            name: searchTerm,  // Include other filters as needed
            sort_by: filters?.sort_by || "",
            min_price: priceRange.min,
            max_price: priceRange.max,
        });
    };
    

    // Add to cart
    const handleAddToCart = (productId, discountedPrice, originalPrice) => {
        const priceToUse =
            discountedPrice < originalPrice ? discountedPrice : originalPrice;

        const updatedData = {
            ...data,
            product_id: productId,
            price: priceToUse,
        };

        setData(updatedData);

        post(route("cart.store"), {
            data: {
                product_id: productId,
                quantity: 1,
                price: priceToUse,
            },
            onSuccess: () => {
                alert("Product added to cart successfully!");
            },
            onError: (errors) => {
                alert("Please confirm the order.");
            },
        });
    };

    // Add to favorite
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

    // Handle sort
    const handleSortChange = (e) => {
        const sortBy = e.target.value;
        Inertia.get(route("shop.getProducts"), { sort_by: sortBy });
    };

    // Handle pagination
    const handlePagination = (url) => {
        if (url) {
            Inertia.get(url);
        }
    };

    return (
        <>
            <FrontMaster>
                <div className="bg-light">
                    <div className="row">
                        <div className="col-12">
                            <img
                                style={{ height: "350px", overflow: "hidden" }}
                                src="/images/premium_photo-1706140675031-1e0548986ad1.jpeg"
                                alt="Shop Image"
                                className="img-fluid w-100"
                            />
                        </div>
                    </div>
                </div>

                <div className="container my-5">
                    <div className="row">
                        {/* Products Section */}
                        <div className="col-lg-9">
                            {/* Search Bar */}
                            <div className="row mb-4">
                                <div className="col d-flex">
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleSearch}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>

                            {/* Sorting */}
                            <div className="row mb-3">
                                <div className="col d-flex justify-content-between">
                                    <p>
                                        Showing {products.from}–{products.to} of{" "}
                                        {products.total} results
                                    </p>
                                    <select
                                        className="form-select w-auto"
                                        onChange={handleSortChange}
                                    >
                                        <option value="">Sort by popularity</option>
                                        <option value="price_low_to_high">
                                            Sort by price: low to high
                                        </option>
                                        <option value="price_high_to_low">
                                            Sort by price: high to low
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="row g-4">
                                {Array.isArray(products.data) &&
                                products.data.length > 0 ? (
                                    products.data.map((product) => (
                                        <div className="col-md-4" key={product.id}>
                                            <div className="product-card">
                                                <Link
                                                    href={route(
                                                        "shop.show",
                                                        product.id
                                                    )}
                                                >
                                                    <img
                                                        style={{
                                                            width: "100%",
                                                            height: "200px",
                                                        }}
                                                        src={`http://127.0.0.1:8000/images/product_image/${product.images[0]?.image}`}
                                                        alt={product.name}
                                                    />
                                                </Link>

                                                <div className="hover-overlay">
                                                    <span
                                                        className="icon"
                                                        onClick={
                                                            !loading
                                                                ? () =>
                                                                      handleAddToFavorite(
                                                                          product.id
                                                                      )
                                                                : undefined
                                                        }
                                                        style={{
                                                            cursor: loading
                                                                ? "not-allowed"
                                                                : "pointer",
                                                        }}
                                                    >
                                                        <i className="fas fa-heart"></i>
                                                    </span>
                                                    <span
                                                        className="icon"
                                                        onClick={() =>
                                                            handleAddToCart(
                                                                product.id,
                                                                product.discounted_price,
                                                                product.price
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-shopping-cart"></i>
                                                    </span>
                                                    <span>
                                                        <Link
                                                            href={route(
                                                                "shop.show",
                                                                product.id
                                                            )}
                                                            className="icon"
                                                        >
                                                            <i className="fas fa-eye"></i>
                                                        </Link>
                                                    </span>
                                                </div>

                                                <h5 className="mt-2">
                                                    <Link
                                                        href={route(
                                                            "shop.show",
                                                            product.id
                                                        )}
                                                    >
                                                        {product.name}
                                                    </Link>
                                                </h5>
                                                <p className="price">
                                                    {product.discounted_price <
                                                    product.price ? (
                                                        <>
                                                            <span className="line-through text-red-500 text-sm mr-2">
                                                                ${product.price}
                                                            </span>
                                                            <span className="text-green-600">
                                                                $
                                                                {product.discounted_price.toFixed(
                                                                    2
                                                                )}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span>${product.price}</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No products available</p>
                                )}
                            </div>

                            {/* Pagination */}
                            <nav className="mt-4">
                                <ul className="pagination justify-content-center">
                                    {Array.isArray(products.links) &&
                                        products.links.map((link, index) => (
                                            <li
                                                key={index}
                                                className={`page-item ${
                                                    link.active ? "active" : ""
                                                } ${
                                                    !link.url ? "disabled" : ""
                                                }`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() =>
                                                        handlePagination(link.url)
                                                    }
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                ></button>
                                            </li>
                                        ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-3">
                            <div className="sidebar mb-4">
                                <h4>Filter by Price</h4>
                                <div className="d-flex align-items-center">
                                    <input
                                        type="number"
                                        name="min"
                                        className="form-control me-2"
                                        placeholder="Min"
                                        value={priceRange.min}
                                        onChange={handlePriceChange}
                                    />
                                    <input
                                        type="number"
                                        name="max"
                                        className="form-control"
                                        placeholder="Max"
                                        value={priceRange.max}
                                        onChange={handlePriceChange}
                                    />
                                </div>
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={handlePriceFilter}
                                >
                                    Filter
                                </button>
                            </div>

                            <div className="sidebar">
                                <h4>Categories</h4>
                                <select
                                    className="form-select"
                                    onChange={handleCategoryChange}
                                >
                                    <option value="">All Categories</option>
                                    {categories?.map((category) => (
                                        <option
                                            value={category.id}
                                            key={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </FrontMaster>
        </>
    );
};

export default Shop;
