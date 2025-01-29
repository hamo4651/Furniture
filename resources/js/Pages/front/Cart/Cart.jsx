import React, { useState, useEffect } from "react";
import "./Cart.css";
import FrontMaster from "../FrontMaster";
import { usePage, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

const Cart = () => {
    const { products, message, coupons } = usePage().props; // إضافة الكوبونات هنا
    const [cartItems, setCartItems] = useState(products);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedCoupon, setSelectedCoupon] = useState(null); // حالة لتخزين الكوبون المختار

    const { data, setData, post, errors, processing, patch } = useForm({
        cart: cartItems,
        coupon_id: selectedCoupon, // إرسال الكوبون مع البيانات
    });

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            const total = cartItems.reduce((sum, item) => {
                return sum + item.price * item.quantity;
            }, 0);
            setTotalPrice(total);
        }
    }, [cartItems]);

    const handleRemove = (cartItemId) => {
        if (confirm("Are you sure you want to remove this item?")) {
            Inertia.delete(route("cart.destroy", cartItemId), {
                onSuccess: (response) => {
                    setCartItems(response.props.products);
                    alert(
                        response.props.message || "Item removed successfully!"
                    );
                },
                onError: (error) => {
                    alert("An error occurred while removing the item.");
                },
            });
        }
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setData(
            "cart",
            data.cart.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
        Inertia.patch(route("cartd.update", itemId), {
            quantity: newQuantity,
        });
    };

    const handleCouponChange = (e) => {
        setSelectedCoupon(e.target.value); // تحديد الكوبون المختار
        setData("coupon_id", e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedCoupon);

        // تأكد من إرسال قيمة coupon_id (إما null أو الكوبون المحدد)
        post(route("placeorders"), {
            data: {
                cart: cartItems,
                coupon_id: selectedCoupon || null, // إرسال الكوبون إذا تم تحديده، أو null إذا لم يتم تحديده
            },
            onSuccess: () => {
                alert("Order placed successfully!");
                window.location.href = "/myorders";
            },
            onError: () => {
                alert("An error occurred while placing the order.");
            },
        });
    };

    return (
        <>
            <FrontMaster>
                <div className="bg-light">
                    <div className="row">
                        <div className="col-12">
                            <img
                                style={{ height: "350px", width: "100%" }}
                                src="/images/premium_photo-1706140675031-1e0548986ad1.jpeg"
                                alt="Cart Image"
                                className="img-fluid w-100"
                            />
                        </div>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is currently empty.</p>
                        <button
                            onClick={() => (window.location.href = "/shop")}
                        >
                            Return to shop
                        </button>
                    </div>
                ) : (
                    <div className="container cart-products">
                        <h3>Products in Your Cart</h3>

                        {cartItems.map((item) => (
                            <div className="product-item" key={item.id}>
                                <img
                                    src={`http://127.0.0.1:8000/images/product_image/${
                                        item.product.images?.[0]?.image ||
                                        "default-image.jpg"
                                    }`}
                                    alt={item.product.name}
                                    className="img-fluid product-image"
                                />
                                <div className="product-details">
                                    <h5>{item.product.name}</h5>
                                    <p>${item.price}</p>
                                    <div className="quantity-section">
                                        <label
                                            htmlFor={`quantity-${item.id}`}
                                            className="quantity-label"
                                        >
                                            Quantity:
                                        </label>
                                        <input
                                            type="number"
                                            id={`quantity-${item.id}`}
                                            min="1"
                                            value={
                                                data.cart.find(
                                                    (cartItem) =>
                                                        cartItem.id === item.id
                                                )?.quantity || 1
                                            }
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    item.id,
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="quantity-input"
                                        />
                                    </div>
                                </div>
                                <div className="product-actions">
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="btn btn-danger remove-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Coupon Section */}
                        <div className="coupon-section">
                            <label htmlFor="coupon" className="coupon-label">
                                Apply Coupon:
                            </label>
                            <select
                                id="coupon"
                                value={selectedCoupon || ""}
                                onChange={handleCouponChange}
                                className="coupon-select"
                            >
                                <option value="">Select Coupon</option>
                                {coupons.map((coupon) => (
                                    <option key={coupon.id} value={coupon.id}>
                                        {coupon.code} -{" "}
                                        {coupon.discount_percentage}% Off
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={handleSubmit}
                                className="btn btn-success text-center w-25 m-auto"
                                disabled={processing}
                            >
                                {processing
                                    ? "Placing Order..."
                                    : "Place Order"}
                            </button>
                        </div>
                    </div>
                )}
            </FrontMaster>
        </>
    );
};

export default Cart;
