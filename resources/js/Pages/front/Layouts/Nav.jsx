import React, { useEffect, useState } from "react";
import "./Nav.css";
import { Link, router, usePage } from "@inertiajs/react"; // مكتبة Inertia.js

const Navbar = () => {
    const handleLogout = () => {
        router.post(route("logout"), {});
    };

    const { auth } = usePage().props; // جلب بيانات المستخدم من Inertia.js
    const { cartCount , favoriteCount} = usePage().props; // Access the shared cart count

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`navbar navbar-expand-lg navbar-custom ${
                scrolled ? "scrolled" : ""
            }`}
        >
            <div className="container-fluid">
                <a className="navbar-brand " href="#">
                    Umeå
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link hover-effect" href="/">
                                Home
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle hover-effect"
                                href="#"
                                id="pagesDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Pages
                            </a>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="pagesDropdown"
                            >
                                <a
                                    className="dropdown-item hover-effect"
                                    href="/about"
                                >
                                    About
                                </a>
                                <a
                                    className="dropdown-item hover-effect"
                                    href="/location"
                                >
                                    Location
                                </a>
                                <a
                                    className="dropdown-item hover-effect"
                                    href="/contact"
                                >
                                    Contact
                                </a>
                                <a
                                    className="dropdown-item hover-effect"
                                    href="/faqpage"
                                >
                                    faqpage
                                </a>
                                <a
                                    className="dropdown-item hover-effect"
                                    href="/shop"
                                >
                                    Shop
                                </a>
                                <a
                                    className="dropdown-item hover-effect"
                                    href="/shopmetro"
                                >
                                    Shopmetro
                                </a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link hover-effect" href="/shop">
                                Shop
                            </a>
                        </li>
                        {auth?.user?.role === "user" && (

                        <li className="nav-item">
                            <a className="nav-link hover-effect" href="/myorders">
                                MyOrders
                            </a>
                        </li>)}
                        {auth?.user?.role === "admin" && (
                            <li className="nav-item">
                            <a className="nav-link hover-effect" href="/admin">
                                Dashboard
                            </a>
                        </li>
                        )}
                         <li className="nav-item">
                            <a className="nav-link hover-effect" href="/getofferproducts">
                                Offers
                            </a>
                        </li>
                        
                        {/* <li className="nav-item">
                            <a className="nav-link hover-effect" href="#">
                                Blog
                            </a>
                        </li> */}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {/* <li className="nav-item">
                            <a className="nav-link hover-effect" href="#">
                                <i className="fas fa-search"></i> Search
                            </a>
                        </li> */}

                        {!auth.user && (
                            <li className="nav-item">
                                <a className="nav-link hover-effect" href="/login">
                                    <i className="fas fa-user"></i> Log In
                                </a>
                            </li>
                        )}

                        {auth.user && (
                            <>
                                <li className="nav-item">
                                    <a
                                        className="nav-link hover-effect"
                                        href="/cart"
                                    >
                                        <i className="fas fa-shopping-cart"></i> 
                                        <span>Cart ({cartCount})</span>

                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link hover-effect"
                                        href="/favorite"
                                    > 
                                        <i className="fas fa-heart"></i> 
                                        <span>Favoirute ({favoriteCount})</span>

                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLogout();
                                        }}
                                        className="nav-link hover-effect"
                                    >
                                        Log Out
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
