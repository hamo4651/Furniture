import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import Master from '../Master';

const Orders = () => {
    const { allOrders } = usePage().props;  // Getting the paginated orders passed by Inertia
    const [orders, setOrders] = useState(allOrders);  // Initialize orders state
//   console.log('no:'+ unreadCount);
  
    // Handle status update
    const updateStatus = (orderId, event) => {
        const status = event.target.value;

        Inertia.put(route('admin.updateStatus', orderId), { status }, {
            onSuccess: (response) => {
                alert('Status updated successfully');
                setOrders(response.props.orders);  // Update orders list
            },
            onError: (error) => {
                alert('An error occurred while updating the status');
                console.error(error);
            },
        });
    };

    // Handle order deletion
    const confirmDelete = (orderId) => {
        const confirmed = window.confirm('Are you sure you want to remove this order?');
        if (confirmed) {
            Inertia.delete(route('admin.deleteorder', orderId), {
                onSuccess: (response) => {
                    alert('Order removed successfully');
                    setOrders(response.props.orders);  // Update orders list after deletion
                },
                onError: (error) => {
                    alert('An error occurred while removing the order');
                    console.error(error);
                },
            });
        }
    };

    // Handle page change (Previous/Next)
    const handlePageChange = (url) => {
        Inertia.get(url, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
         
        <div className="container-fluid px-5" style={{ marginTop: '30px' }}>
            <h1 className="text-center mb-4">All Orders</h1>
            <a href={route("index")} className="btn btn-primary" >Return back</a>

            <table className="table table-striped table-bordered shadow-sm">
                <thead className="bg-light">
                    <tr>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>User Phone</th>
                        <th>Products</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.data && orders.data.length > 0 ? (
                        orders.data.map((item) => (
                            <tr key={item.id} className="align-middle">
                                <td>{item.user.name}</td>
                                <td>{item.user.email}</td>
                                <td>{item.user.phone_number}</td>
                                <td>
                                    <ul>
                                        {item.products.map((product, index) => (
                                            <li key={index}>
                                                {product.name} - price: ${product.price} - quantity: {product.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>${item.total_price}</td>
                                <td>
                                    <select 
                                        className="form-select form-select-sm w-100"
                                        value={item.status}
                                        onChange={(e) => updateStatus(item.id, e)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                                <td>
                                    <button 
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => confirmDelete(item.id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center text-muted">No orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {orders.last_page > 1 && (
                <div className="d-flex justify-content-between">
                    {/* Previous Button */}
                    {orders.prev_page_url && (
                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handlePageChange(orders.prev_page_url)}
                        >
                            Previous
                        </button>
                    )}

                    {/* Page Info */}
                    <div className="my-auto">
                        <strong>Page {orders.current_page} of {orders.last_page}</strong>
                    </div>

                    {/* Next Button */}
                    {orders.next_page_url && (
                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handlePageChange(orders.next_page_url)}
                        >
                            Next
                        </button>
                    )}
                </div>
            )}
        </div>
       
    );
    
};

export default Orders;
