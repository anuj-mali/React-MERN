import React, { useEffect } from "react";
import { useState } from "react";
import { getOrdersByUserApi, getAllOrdersApi } from "../../apis/Api";

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllOrdersApi().then((res) => {
            console.log(res);
            setOrders(res.data.orders);
        });
    }, []);
    return (
        <div className="container mt-3">
            <h3>All Orders</h3>
            {orders.map((order) => (
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h6>ORDER - {order.orderNumber}</h6>
                        <h6>Pending</h6>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.cart.map((item) => (
                                    <tr>
                                        <th scope="row">
                                            <img src={item.image} alt="" width="50" />
                                        </th>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <div>
                            <h6>Order Date : {order.orderedAt}</h6>
                        </div>
                        <div>
                            <h6>Shipping info : {order.shippingAddress}</h6>
                        </div>
                        <div>
                            <h6>Total Price : {order.totalAmount}</h6>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminOrder;