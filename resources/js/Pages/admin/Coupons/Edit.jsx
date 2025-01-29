import { useForm, usePage } from "@inertiajs/react";
import Master from "../Master";

export default function Edit() {
    const { coupon } = usePage().props; // جلب بيانات الكوبون من Laravel

    const { data, setData, put, errors } = useForm({
        code: coupon.code || "",
        discount_percentage: coupon.discount_percentage || "",
        max_uses: coupon.max_uses || "",
        start_date: coupon.start_date || "",
        end_date: coupon.end_date || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.coupons.update", { coupon: coupon.id }), {
            onSuccess: () => {
                console.log("Coupon updated successfully!");
            },
        });
    };

    return (
        <>
            <Master>
                <h1 className="text-3xl font-bold text-center mb-4">Edit Coupon</h1>
                <div className="container bg-light my-4 p-4">
                    <form onSubmit={handleSubmit}>
                        {/* حقل الكود */}
                        <div className="mb-3">
                            <label htmlFor="code" className="form-label">Coupon Code</label>
                            <input
                                type="text"
                                id="code"
                                className={`form-control ${errors.code ? "is-invalid" : ""}`}
                                value={data.code}
                                onChange={(e) => setData("code", e.target.value)}
                            />
                            {errors.code && (
                                <div className="invalid-feedback">{errors.code}</div>
                            )}
                        </div>

                        {/* نسبة الخصم */}
                        <div className="mb-3">
                            <label htmlFor="discount_percentage" className="form-label">
                                Discount Percentage
                            </label>
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

                        {/* الحد الأقصى للاستخدام */}
                        <div className="mb-3">
                            <label htmlFor="max_uses" className="form-label">Maximum Uses</label>
                            <input
                                type="number"
                                id="max_uses"
                                className={`form-control ${errors.max_uses ? "is-invalid" : ""}`}
                                value={data.max_uses}
                                onChange={(e) => setData("max_uses", e.target.value)}
                            />
                            {errors.max_uses && (
                                <div className="invalid-feedback">{errors.max_uses}</div>
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
                        <button type="submit" className="btn btn-primary">Update Coupon</button>
                    </form>
                </div>
            </Master>
        </>
    );
}
