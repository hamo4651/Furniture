import React, { useState, useEffect } from "react";
import "./ShopMetro.css"; // Add custom CSS
import FrontMaster from "../FrontMaster";
import { Inertia } from "@inertiajs/inertia"; // إضافة Inertia
import { Link, usePage } from "@inertiajs/react";

const ShopMetro = () => {
    const {
        products = { data: [], from: 0, to: 0, total: 0, links: [] },
        filters,
    } = usePage().props; // استخدام Inertia لتحميل البيانات

    const [loading, setLoading] = useState(false);

    // التعامل مع التغيير في الصفحات
    const handlePageChange = (url) => {
        if (url) {
            setLoading(true);
            Inertia.get(url, {}, { preserveState: true }); // استخدام Inertia للتصفح
        }
    };

    // التصفية حسب السعر
    const handleSortChange = (e) => {
        const sortBy = e.target.value;
        Inertia.get(route("shop.getProducts"), { sort_by: sortBy });
    };

    // تصفية الروابط لإزالة النصوص غير المرغوب فيها
    const filteredLinks = products.links.filter((link) => {
        return link.label !== "&laquo; Previous" && link.label !== "Next &raquo;";
    });

    return (
        <>
            <FrontMaster>
                {/* قسم المنتجات */}
                <div className="container my-5">
                    <div className="row g-4">
                        {/* Loop over the products */}
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            products.data.map((product) => (
                                <div className="col-lg-6" key={product.id}>
                                    {/* Large Product */}
                                    <div className="large-product">
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

                                        <Link
                                            href={route(
                                                "shop.show",
                                                product.id
                                            )}
                                        >
                                            <div className="hover-overlay">
                                                <span className="icon">
                                                    <i className="fas fa-heart"></i>
                                                </span>
                                                <span className="icon">
                                                    <i className="fas fa-shopping-cart"></i>
                                                </span>
                                            </div>
                                        </Link>

                                        <div className="d-flex justify-content-between">
                                            <h2>{product.name}</h2>
                                            <p className="price">
                                                ${product.price}
                                            </p>
                                        </div>
                                        <p className="d-flex justify-content-between">
                                            {product.category}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center my-4">
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li
                                    className={`page-item ${
                                        products.from === 1 ? "disabled" : ""
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            handlePageChange(
                                                products.links[0]?.url
                                            )
                                        }
                                        disabled={products.from === 1}
                                    >
                                        Previous
                                    </button>
                                </li>

                                {/* Loop over the filtered page numbers */}
                                {Array.isArray(filteredLinks) &&
                                    filteredLinks.map((link, index) => (
                                        <li
                                            className={`page-item ${
                                                link.active ? "active" : ""
                                            }`}
                                            key={index}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() =>
                                                    handlePageChange(link.url)
                                                }
                                            >
                                                {link.label}
                                            </button>
                                        </li>
                                    ))}

                                <li
                                    className={`page-item ${
                                        products.to === products.total
                                            ? "disabled"
                                            : ""
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            handlePageChange(
                                                products.links[
                                                    products.links.length - 1
                                                ]?.url
                                            )
                                        }
                                        disabled={
                                            products.to === products.total
                                        }
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </FrontMaster>
        </>
    );
};

export default ShopMetro;
