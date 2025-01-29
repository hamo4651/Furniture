import Master from "../Master";
import { usePage } from "@inertiajs/react"; // لجلب البيانات القادمة من Laravel
import { Inertia } from "@inertiajs/inertia";

export default function Welcome() {
    const { products } = usePage().props; // الحصول على البيانات المرسلة من Laravel
    const {offers} = usePage().props
    console.log(offers);

    return (
        <>
            <Master>
                <h1 className="text-3xl font-bold text-center">Products</h1>

                <div className="container bg-light my-4 p-4">

                    <a
                        href={route("admin.product.create")}
                        className="btn btn-primary text-left mb-3"
                    >
                        Create
                    </a>
                    {products.data.length > 0 ? (
                        <>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="text-center">Name</th>
                                        <th className="text-center">Price</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Images</th>
                                        <th className="text-center">Offers</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr key={product.id}>
                                            <td className="text-center">
                                                {product.name}
                                            </td>
                                            <td className="text-center">
                                                {product.price}
                                            </td>
                                            <td className="text-center">
                                                {product.status}
                                            </td>
                                            <td className="text-center">
                                                {product.images.length > 0 ? (
                                                    <img
                                                        src={`http://127.0.0.1:8000/images/product_image/${product.images[0].image}`}
                                                        alt={product.name}
                                                        style={{
                                                            width: "50px",
                                                            height: "50px",

                                                        }}
                                                        className="img-thumbnail text-center ms-5"
                                                    />
                                                ) : (
                                                    <span>No Images</span>
                                                )}
                                            </td>
                                            <td className="text-center">
                                            <a
                                                    href={route(
                                                        "admin.product.show",
                                                        { product: product.id }
                                                    )}
                                                    className="btn btn-info"
                                                >
                                                    Set Offers
                                                </a>                                            </td>
                                            <td className="text-center">
                                                <a
                                                    href={route(
                                                        "admin.product.edit",
                                                        { product: product.id }
                                                    )} // استخدام route مع تمرير معرف المنتج
                                                    className="btn btn-primary"
                                                >
                                                    Edit
                                                </a>
                                                <a
                                                    href="#"
                                                    className="btn btn-danger mx-2"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (
                                                            confirm(
                                                                "Are you sure you want to delete this product?"
                                                            )
                                                        ) {
                                                            Inertia.delete(
                                                                route(
                                                                    "admin.product.destroy",
                                                                    {
                                                                        product:
                                                                            product.id,
                                                                    }
                                                                ),
                                                                {
                                                                    onSuccess:
                                                                        () => {
                                                                            console.log(
                                                                                "Product deleted successfully."
                                                                            );
                                                                        },
                                                                }
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </a>

                                                <a
                                                    href={route(
                                                        "admin.product.show",
                                                        { product: product.id }
                                                    )}
                                                    className="btn btn-info"
                                                >
                                                    Show
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* عرض روابط التصفح (pagination) */}
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                {products.links.map((link, index) => (
                                    <button
                                        key={index}
                                        className={`btn ${
                                            link.active
                                                ? "btn-primary"
                                                : "btn-outline-primary"
                                        }`}
                                        onClick={() => {
                                            if (link.url) {
                                                window.location.href = link.url;
                                            }
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    ></button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-muted">
                            No products available.
                        </p>
                    )}
                </div>
            </Master>
        </>
    );
}
