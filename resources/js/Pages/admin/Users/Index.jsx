import Master from "../Master";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Users() {
    const { users } = usePage().props;

    return (
        <Master>
            <div className="container" style={{ marginTop: "20px" }}>
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-dark roboto-bold mb-4">Users</h2>
                        <div className="row gy-4">
                            {users.map((user) => (
                                <div className="col-sm-6 col-md-4" key={user.id}>
                                    <div className="card shadow border-0 rounded">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h5 className="card-title text-dark m-0">
                                                    {user.name}
                                                </h5>
                                                <a
                                                    className="btn btn-outline-primary btn-sm rounded-pill"
                                                    href={route("admin.users.show", { user: user.id })}
                                                >
                                                    View Details
                                                </a>
                                            </div>
                                            <p className="card-subtitle text-muted mb-1">
                                                {user.email}
                                            </p>
                                            {user.phone_number && (
                                                <p
                                                    className="text-muted mb-1"
                                                    style={{ fontSize: "0.9rem" }}
                                                >
                                                    <i className="fas fa-solid fa-phone me-1 text-primary"></i>
                                                    {user.phone_number}
                                                </p>
                                            )}
                                        </div>

                                        <div className="card-footer bg-light d-flex justify-content-between align-items-center">
                                            
                                            <span className="text-muted">
                                                <b>{user.role}</b>
                                            </span>
                                            <button
                                                className="btn btn-danger btn-sm rounded-pill"
                                                data-bs-toggle="modal"
                                                data-bs-target={`#deleteModal${user.id}`}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    {/* Delete Modal */}
                                    <div
                                        className="modal fade"
                                        id={`deleteModal${user.id}`}
                                        tabIndex="-1"
                                        aria-labelledby={`deleteModalLabel${user.id}`}
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5
                                                        className="modal-title"
                                                        id={`deleteModalLabel${user.id}`}
                                                    >
                                                        Delete Confirmation
                                                    </h5>
                                                    <button
                                                        type="button"
                                                        className="btn-close"
                                                        data-bs-dismiss="modal"
                                                        aria-label="Close"
                                                    ></button>
                                                </div>
                                                <div className="modal-body">
                                                    Are you sure you want to delete{" "}
                                                    <b>{user.name}</b>?
                                                </div>
                                                <div className="modal-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary btn-sm rounded-pill"
                                                        data-bs-dismiss="modal"
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm rounded-pill"
                                                        data-bs-dismiss="modal"
                                                        onClick={() =>
                                                            Inertia.delete(route("admin.users.destroy", { user: user.id }))
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    );
}
