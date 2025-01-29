import Master from "../Master";
import { usePage } from "@inertiajs/react"; // لجلب البيانات القادمة من Laravel
import { Inertia } from "@inertiajs/inertia";
export default function Index({ products }) {
    // التحقق من وجود البيانات
    if (!products || products.length === 0) {
        return (
            <Master>
                <h1 className="text-3xl font-bold text-center">
                    No Products Available
                </h1>
            </Master>
        );
    }
    console.log(products);
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product offer?")) {
            const deleteRoute = route("admin.productoffer.destroy", { productoffer:id }); // إنشاء الرابط
            Inertia.delete(deleteRoute, {
                onSuccess: () => {
                    alert("Product offer deleted successfully!");
                },
                onError: (error) => {
                    alert("Failed to delete product offer.");
                    console.error(error);
                },
            });
        }
    };


    return (
        <>
            <Master>
                <h1 className="text-3xl font-bold text-center">
                    Product Offers
                </h1>

                <div className="table-responsive mt-4">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Original Price</th>
                                <th>Discount</th>
                                <th>Discounted Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        {product.offers.length > 0
                                            ? `${product.offers[0].discount_percentage}%`
                                            : "No Discount"}
                                    </td>
                                    <td>
                                        {/* التحقق من أن discounted_price هو عدد قبل استخدام toFixed */}
                                        {typeof product.discounted_price ===
                                        "number"
                                            ? product.discounted_price.toFixed(
                                                  2
                                              )
                                            : "N/A"}
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => handleDelete(product.offers[0].pivot.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Master>
        </>
    );
}
