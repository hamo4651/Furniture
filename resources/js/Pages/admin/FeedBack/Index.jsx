import { usePage } from "@inertiajs/react";
import Master from "../Master";
import { Inertia } from '@inertiajs/inertia';

export default function Index() {
    const { feedBacks } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this feedback?")) {
            Inertia.delete(route("admin.feedback.destroy", { feedback: id }), {
                onSuccess: () => {
                    console.log("Feedback deleted successfully!");
                    setFeedBacks((prevFeedBacks) =>
                        prevFeedBacks.filter((feedback) => feedback.id !== id)
                    );
                },
            });
        }
    };

    return (
        <>
            <Master>
                <div className="bg-white p-4">
                    <h1 className="text-3xl font-bold mb-4">FeedBack</h1>

                    {/* جدول عرض Feedbacks */}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className=" px-4 py-2">ID</th>
                                <th className=" px-4 py-2">Name</th>
                                <th className=" px-4 py-2">Email</th>
                                <th className=" px-4 py-2">Message</th>
                                <th className=" px-4 py-2">Rating</th>
                                <th className=" px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedBacks.data.map((feedback) => (
                                <tr key={feedback.id}>
                                    <td className=" px-4 py-2">
                                        {feedback.id}
                                    </td>
                                    <td className=" px-4 py-2">
                                        {feedback.name}
                                    </td>
                                    <td className=" px-4 py-2">
                                        {feedback.email}
                                    </td>
                                    <td className=" px-4 py-2">
                                        {feedback.message}
                                    </td>
                                    <td className=" px-4 py-2">
                                        {feedback.rating}
                                    </td>
                                    <td className=" px-4 py-2">
                                        <div className="d-flex">
                                            <a
                                                href={route(
                                                    "admin.feedback.show",
                                                    { feedback: feedback.id }
                                                )}
                                                className="btn btn-primary mx-1"
                                            >
                                                Show
                                            </a>
                                            <button
                                                onClick={() =>
                                                    handleDelete(feedback.id)
                                                }
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="mt-4 flex justify-between items-center">
                        {feedBacks.links.map((link, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 mx-1 border rounded ${
                                    link.active
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-gray-700"
                                }`}
                                onClick={() =>
                                    link.url && window.location.assign(link.url)
                                }
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </Master>
        </>
    );
}
