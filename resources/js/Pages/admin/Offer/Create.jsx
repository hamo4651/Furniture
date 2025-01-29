import { useForm } from "@inertiajs/react";
import Master from "../Master";

export default function Create() {
    const { data, setData, post, errors } = useForm({
        title: "",
        description: "",
        discount_percentage: "",
        start_date: "",
        end_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.offer.store"), {
            onSuccess: () => {
                console.log("Offer created successfully!");
            },
        });
    };

    return (
        <>
            <Master>
                <h1 className="text-3xl font-bold text-center mb-4">Create Offer</h1>
                <div className="bg-light p-4">
                    <form onSubmit={handleSubmit}>
                        {/* حقل العنوان */}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                id="title"
                                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                            />
                            {errors.title && (
                                <div className="invalid-feedback">{errors.title}</div>
                            )}
                        </div>

                        {/* الوصف */}
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                id="description"
                                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                            ></textarea>
                            {errors.description && (
                                <div className="invalid-feedback">{errors.description}</div>
                            )}
                        </div>

                        {/* نسبة الخصم */}
                        <div className="mb-3">
                            <label htmlFor="discount_percentage" className="form-label">Discount Percentage</label>
                            <input
                                type="number"
                                id="discount_percentage"
                                className={`form-control ${
                                    errors.discount_percentage ? "is-invalid" : ""
                                }`}
                                value={data.discount_percentage}
                                onChange={(e) =>
                                    setData("discount_percentage", e.target.value)
                                }
                            />
                            {errors.discount_percentage && (
                                <div className="invalid-feedback">
                                    {errors.discount_percentage}
                                </div>
                            )}
                        </div>

                        {/* تاريخ البداية */}
                        <div className="mb-3">
                            <label htmlFor="start_date" className="form-label">Start Date</label>
                            <input
                                type="date"
                                id="start_date"
                                className={`form-control ${errors.start_date ? "is-invalid" : ""}`}
                                value={data.start_date}
                                onChange={(e) => setData("start_date", e.target.value)}
                            />
                            {errors.start_date && (
                                <div className="invalid-feedback">{errors.start_date}</div>
                            )}
                        </div>

                        {/* تاريخ النهاية */}
                        <div className="mb-3">
                            <label htmlFor="end_date" className="form-label">End Date</label>
                            <input
                                type="date"
                                id="end_date"
                                className={`form-control ${errors.end_date ? "is-invalid" : ""}`}
                                value={data.end_date}
                                onChange={(e) => setData("end_date", e.target.value)}
                            />
                            {errors.end_date && (
                                <div className="invalid-feedback">{errors.end_date}</div>
                            )}
                        </div>

                        {/* زر الإرسال */}
                        <button type="submit" className="btn btn-primary">
                            Create Offer
                        </button>
                    </form>
                </div>
            </Master>
        </>
    );
}
