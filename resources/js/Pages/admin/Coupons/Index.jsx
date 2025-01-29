import { usePage } from "@inertiajs/react";
import Master from "../Master";
import { Inertia } from '@inertiajs/inertia';

export default function Index() {
    const { coupons } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this coupon?")) {
            Inertia.delete(route("admin.coupons.destroy", { coupon: id }), {
                preserveScroll: true,
                onSuccess: () => {
                    console.log("Coupon deleted successfully!");
                },
            });
        }
    };

    return (
        <>
            <Master>
                <h1 className="text-3xl font-bold text-center mb-4">Coupons</h1>
                <a
                    href={route("admin.coupons.create")}
                    className="btn btn-primary text-left mb-3"
                >
                    Create
                </a>{" "}
                <div className="container bg-light my-4 p-4">
                    {coupons.data.length > 0 ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Code</th>
                                    <th>Discount Percentage</th>
                                    <th>Max Uses</th>
                                    <th>Valid From</th>
                                    <th>Valid To</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.data.map((coupon) => (
                                    <tr key={coupon.id}>
                                        <td>{coupon.id}</td>
                                        <td>{coupon.code}</td>
                                        <td>{coupon.discount_percentage}%</td>
                                        <td>{coupon.max_uses}</td>
                                        <td>{coupon.start_date}</td>
                                        <td>{coupon.end_date}</td>
                                        <td>
                                            <div className="d-flex">
                                                <a
                                                    href={route(
                                                        "admin.coupons.edit",
                                                        { coupon: coupon.id }
                                                    )}
                                                    className="btn btn-primary mx-1"
                                                >
                                                    Edit
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(coupon.id)
                                                    }
                                                    className="btn btn-danger"
                                                >
                                                    Delete
                                                </button>{" "}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-muted">
                            No coupons available.
                        </p>
                    )}

                    {/* Pagination */}
                    <div className="mt-4 d-flex justify-content-center">
                        {coupons.links.map((link, index) => (
                            <button
                                key={index}
                                className={`btn mx-1 ${
                                    link.active
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                }`}
                                onClick={() => window.location.assign(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </Master>
        </>
    );
}
