import React, { useEffect, useState } from 'react';
import { fetchOrders, deleteOrder } from '../api';
import {OrderForm} from './orderForm';

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetchOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    loadOrders();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetchOrders();
      setOrders(response.data);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Failed to refresh orders', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      setOrders(orders.filter((order) => order.id !== id));
    } catch (error) {
      console.error('Failed to delete order', error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <OrderForm order={selectedOrder} onSave={handleSave} />
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order ID: {order.id} - Total: ${order.total}
            <button onClick={() => setSelectedOrder(order)}>Edit</button>
            <button onClick={() => handleDelete(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


