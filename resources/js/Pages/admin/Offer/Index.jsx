import { usePage } from "@inertiajs/react";
import Master from "../Master";
import { Inertia } from "@inertiajs/inertia";

export default function Index() {
    const { offers } = usePage().props; // جلب بيانات العروض الممررة من Laravel

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this offer?")) {
            Inertia.delete(route("admin.offer.destroy", { offer: id }), {
                onSuccess: () => {
                    console.log("Offer deleted successfully!");
                    setOffers((prevOffers) =>
                        prevOffers.filter((offer) => offer.id !== id)
                    );
                },
            });
        }
    };

    return (
        <>
            <Master>
                <h1 className="text-3xl font-bold text-center mb-4">Offers</h1>
                <a
                    href={route("admin.offer.create")}
                    className="btn btn-primary mb-4"
                >
                    Create
                </a>
                <div className="bg-light p-4">
                    {offers.data.length > 0 ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Discount</th>
                                    {/* <th>Start Date</th>
                                    <th>End Date</th> */}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {offers.data.map((offer) => (
                                    <tr key={offer.id}>
                                        <td>{offer.id}</td>
                                        <td>{offer.title}</td>
                                        <td>{offer.description}</td>
                                        <td>{offer.discount_percentage}%</td>
                                        {/* <td>{offer.start_date}</td>
                                        <td>{offer.end_date}</td> */}
                                        <td>
                                            <a
                                                href={route("admin.offer.edit", {
                                                    offer: offer.id,
                                                })}
                                                className="btn btn-warning mx-1"
                                            >
                                                Edit
                                            </a>
                                            <button
                                                onClick={() =>
                                                    handleDelete(offer.id)
                                                }
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-muted">
                            No offers available.
                        </p>
                    )}

                    {/* Pagination */}
                    <div className="mt-4 d-flex justify-content-center">
                        {offers.links.map((link, index) => (
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
