import { usePage } from "@inertiajs/react";
import Master from "../Master";
import { Inertia } from "@inertiajs/inertia";
export default function Show() {
    const { product, offers } = usePage().props; // جلب بيانات المنتج والعروض من Laravel
    console.log(offers);


const handleApplyOffer = (offerId) => {
    if (confirm("Are you sure you want to apply this offer to the product?")) {
        Inertia.post(route("admin.productoffer.store"), {
            product_id: product.id,
            offer_id: offerId,
        });
    }
};

const handleRemoveOffer = (productOfferId) => {
    if (confirm("Are you sure you want to remove this offer from the product?")) {
        Inertia.delete(route("admin.productoffer.destroy", { productoffer: productOfferId }), {
            onSuccess: () => {
                console.log("Offer removed successfully!");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    }
};

// console.log(productoffer);


    if (!product) {
        return (
            <Master>
                <div className="bg-white p-4">
                    <h1 className="text-3xl font-bold text-center">
                        Product Not Found
                    </h1>
                </div>
            </Master>
        );
    }

    return (
        <>
            <Master>
                <div className="bg-white p-4">
                    <h1 className="text-3xl font-bold mb-4">Product Details</h1>

                    {/* تفاصيل المنتج */}
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold">
                            {product.name}
                        </h2>
                        <p className="text-muted">{product.description}</p>
                        <p>
                            <strong>Price:</strong> ${product.price}
                        </p>
                        <p>
                            <strong>Quantity:</strong> {product.quantity}
                        </p>
                        <p>
                            <strong>Status:</strong>{" "}
                            {product.status === "instock"
                                ? "In Stock"
                                : "Out of Stock"}
                        </p>
                    </div>

                    {/* صور المنتج */}
                    <div>
                        <h3 className="text-xl font-bold mb-2">Images</h3>
                        {product.images.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`http://127.0.0.1:8000/images/product_image/${image.image}`}
                                        alt={`${product.name} - ${index + 1}`}
                                        className="w-full h-auto rounded shadow"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No images available for this product.</p>
                        )}
                    </div>

                    <div className="mt-6">
    <h3 className="text-xl font-bold mb-2">Available Offers</h3>
    {offers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {offers.map((offer) => {
    // حساب السعر بعد الخصم
    const discountedPrice = (
        product.price -
        (product.price * offer.discount_percentage) / 100
    ).toFixed(2);

    return (
        <div
            key={offer.id}
            className="border p-4 rounded shadow bg-light"
        >
            <h4 className="text-lg font-semibold">{offer.title}</h4>
            <p className="text-muted">{offer.description}</p>

            <p>
                <strong>Discount:</strong>{" "}
                {offer.discount_percentage}%
            </p>
            <p>
                <strong>Start Date:</strong> {offer.start_date}
            </p>
            <p>
                <strong>End Date:</strong> {offer.end_date}
            </p>
            <p className="mt-2">
                <strong>Price Before Discount:</strong>{" "}
                ${product.price}
            </p>
            <p className="mt-2">
                <strong>Price After Discount:</strong>{" "}
                ${discountedPrice}
            </p>

            {offer.is_applied ? (
                <button
                    className="btn btn-danger mt-3"
                    onClick={() =>
                        handleRemoveOffer(offer.product_offer_id)
                    }
                >
                    Remove Offer
                </button>
            ) : (
                <button
                    className="btn btn-success mt-3"
                    onClick={() => handleApplyOffer(offer.id)}
                >
                    Apply Offer
                </button>
            )}
        </div>
    );
})}

        </div>
    ) : (
        <p>No offers available for this product.</p>
    )}
</div>


                </div>
            </Master>
        </>
    );
}
