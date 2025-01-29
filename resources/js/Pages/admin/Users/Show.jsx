import { usePage } from "@inertiajs/react";
import Master from "../Master";
import { Inertia } from "@inertiajs/inertia";

export default function UserProfile({ user }) {
  return (
    console.log(user),
    
    <Master>
      <div className="container w-75 mx-auto p-4" style={{ marginTop: "20px" }}>
        

          
            <div className="card shadow-lg border-0 rounded">
              <div className="card-body">
                <div className="row align-items-center">
                  {/* User Image Section */}
                  <div className="col-md-4 text-center border-end py-4">
                    <img

                      src={`http://127.0.0.1:8000/storage/profile_images/${user?.profile_image}` || "/images/images.jpeg"}
                      alt="Profile"
                      className="img-fluid avatar-xxl rounded-circle border ms-4"
                      style={{ width: "150px", height: "150px" }}
                    />
                    <h4 className="text-center font-weight-bold mt-3 mb-2 text-dark">
                      {user?.name || "Unknown User"}
                    </h4>
                  </div>

                  {/* User Information Section */}
                  <div className="col-md-8">
                    <div className="ms-3">
                      <h4 className="text-dark font-weight-bold mb-3">User Information</h4>
                      <p className="text-bold mb-2">
                        <strong>Email:</strong> {user?.email || "N/A"}
                      </p>
                      {user?.phone_number && (
                        <p className="text-bold mb-2">
                          <strong>Phone:</strong> {user.phone_number}
                        </p>
                      )}
                    
                      <p className="text-bold mb-0">
                        <strong>Role:</strong> {user?.role || "Unassigned"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            {user?.reviews?.length > 0 ? (
              <div className="mt-5">
                <h5 className="text-center fw-bold fs-4 text-dark mb-4">Reviews</h5>
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Property Name</th>
                      <th>Review</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.reviews.map((review, index) => (
                      <tr key={index}>
                        <td>{review.property_name}</td>
                        <td>{review.review}</td>
                        <td>{review.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center mt-5">
                <h5 className="fw-bold fs-5 text-dark">Reviews</h5>
                <p className="text-muted">No reviews found.</p>
              </div>
            )}
          </div>
       
    </Master>
  );
}
