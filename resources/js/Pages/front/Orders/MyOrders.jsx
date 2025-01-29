import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import "./myorders.css";
import FrontMaster from '../FrontMaster';

const MyOrders = () => {
    const { orders } = usePage().props;  // Getting the orders and pagination from Inertia
    const [allOrders, setAllOrders] = useState(orders.data); // Initialize state with orders
    const [loading, setLoading] = useState(false); // Loading state for cancellation process

    console.log(orders);
    
    // Handle status update
    const confirmDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to cancel this order?');
        if (confirmed) {
            cancelOrder(id);
        }
    };

    const cancelOrder = (id) => {
        setLoading(true); // Show loading indicator while request is processing

        // Use Inertia.delete through Inertia to delete the order
        Inertia.delete(route('cancelorder', id), {
            onSuccess: (response) => {
                setAllOrders(response.props.orders.data); // Update orders list after successful cancellation
                alert('Order canceled successfully');
                setLoading(false); // Stop loading after success
            },
            onError: (error) => {
                setLoading(false); // Stop loading on error
                alert('An error occurred while canceling the order');
                console.error(error);
            },
        });
    };

    // Handle pagination
    const goToPage = (pageNumber) => {
        // Use Inertia to fetch the page of orders
        Inertia.get(route('myorders'), { page: pageNumber }, {
            preserveState: true, // Keep the state (e.g., active tab, form data, etc.)
        });
    };

    return (
        <>
                    <FrontMaster>  

                    
        <div className="container" style={{ marginTop: '50px' }}>
            <h1 className="text-center mb-4">My Orders</h1>

            {loading && <div className="loading-indicator text-center">Processing...</div>} {/* Show loading state */}

            <div className="order-table-container">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Products</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders.length > 0 ? (
                            allOrders.map((item) => (
                                <tr key={item.id} className="align-middle">
                                    <td>{item.id}</td>
                                    <td>
                                        <ul>
                                            {item.products.map((product, index) => (
                                                <li key={index}>
                                                    {product.name} - Price: ${product.price} - Quantity: {product.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>${item.total_price}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        {item.status === 'pending' && (
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={() => confirmDelete(item.id)}
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination-container text-center">
                <button
                    onClick={() => goToPage(orders.current_page - 1)}
                    disabled={orders.current_page === 1}
                    className="btn btn-outline-primary me-2"
                >
                    Previous
                </button>
                <span>Page {orders.current_page} of {orders.last_page}</span>
                <button
                    onClick={() => goToPage(orders.current_page + 1)}
                    disabled={orders.current_page === orders.last_page}
                    className="btn btn-outline-primary ms-2"
                >
                    Next
                </button>
            </div>
        </div>
        </FrontMaster>
        </>
    );
};

export default MyOrders;
