import { usePage } from "@inertiajs/react";
import Master from "../Master";

export default function Show() {
    const { feedBack } = usePage().props; // جلب بيانات Feedback من Laravel

    return (
        <>
            <Master>
                <h1 className="text-3xl font-bold text-center">Show FeedBack</h1>
                <div className="container bg-light my-4 p-4">
                    <div className="mb-3">
                        <h3>ID:</h3>
                        {/* <p>{feedBack.id}</p> */}
                    </div>
                    <div className="mb-3">
                        <h3>Name:</h3>
                        <p>{feedBack.name}</p>
                    </div>
                    <div className="mb-3">
                        <h3>Email:</h3>
                        <p>{feedBack.email}</p>
                    </div>
                    <div className="mb-3">
                        <h3>Message:</h3>
                        <p>{feedBack.message}</p>
                    </div>
                    <div className="mt-4">
                        <a href={route("admin.feedback.index")} className="btn btn-secondary">
                            Back to Feedbacks
                        </a>
                    </div>
                </div>
            </Master>
        </>
    );
}
