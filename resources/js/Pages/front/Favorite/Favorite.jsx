import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import FrontMaster from "../FrontMaster";

export default function Favorite() {
    const { favorites } = usePage().props; // استقبال البيانات من الـ backend
console.log(favorites);

    // دالة لحذف العنصر من المفضلة
    const handleRemoveFavorite = (favoriteId) => {
        if (confirm("Are you sure you want to remove this product from your favorites?")) {
            Inertia.delete(route("favorite.destroy", favoriteId), {
                onSuccess: () => {
                    alert("Product removed from favorites successfully!");
                    // تحديث المفضلة بعد الحذف
                    const updatedFavorites = favorites.data.filter(fav => fav.id !== favoriteId);
                    // تحديث المصفوفة المفضلة بشكل محلي
                    setFavorites({ ...favorites, data: updatedFavorites });
                },
                onError: () => {
                    alert("An error occurred. Please try again.");
                },
            });
        }
    };
    

    return (
        <FrontMaster>
            <div className="container my-5">
            <div className="row">
                    <div className="col-12">
                        <img
                            style={{ height: "350px" }}
                            src="/images/premium_photo-1706140675031-1e0548986ad1.jpeg"
                            alt="Login Image"
                            className="img-fluid w-100"
                        />
                    </div>
                </div>
                <h1 className="text-center my-4">Your Favorites</h1>

                {/* إذا كانت المفضلة فارغة */}
                {favorites.data.length === 0 ? (
                    <div className="text-center">
                        <p className="text-muted">Your favorite list is currently empty.</p>
                        <a href="/shop" className="btn btn-primary">
                            Explore Products
                        </a>
                    </div>
                ) : (
                    /* عرض المنتجات المفضلة */
                    <div className="row">
                        {favorites.data.map((favorite) => (
                            <div className="col-md-3 mb-4" key={favorite.id}>
                                <div className="card h-100">
                                    <img
                                        src={`http://127.0.0.1:8000/images/product_image/${favorite.product.images[0]?.image}`}
                                        className="card-img-top"
                                        alt={favorite.product.name}
                                        /> 
                                    <div className="card-body">
                                        <h5 className="card-title">{favorite.product.name}</h5>
                                        <p className="card-text">${favorite.product.price}</p>
                                        {favorite.product.offers && favorite.product.offers.length > 0 && (
        <div className="offers mt-4">
            <h6 className="text-md font-medium text-gray-700 mb-2">Available Offers:</h6>
            <ul className="list-disc list-inside">
                {favorite.product.offers.map((offer) => (
                    <li key={offer.id} className="text-gray-600 text-sm">
                        Save <span className="text-green-600 font-bold">{offer.discount_percentage}%</span>
                    </li>
                ))}
            </ul>
        </div>
    )}
                                        <div className="d-flex justify-content-between">
                                            <a
                                                href={route("shop.show", favorite.product.id)}
                                                className="btn btn-outline-primary"
                                            >
                                                View Details
                                            </a>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => handleRemoveFavorite(favorite.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </FrontMaster>
    );
}
