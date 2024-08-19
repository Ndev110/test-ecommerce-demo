import React, { useEffect, useState } from 'react';
import { fetchOrders, deleteOrder } from '../api';
import {OrderForm} from './orderForm';
import { useNavigate } from 'react-router-dom';
import { Button,ListGroup, ListGroupItem } from "flowbite-react";
import '../App.css';
export const OrderList = () => {
  const navigate = useNavigate();
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
 const goBack =()=>{
  navigate(-1);
 }
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
    <div className='App App-header'>
      <h2 className="text-3xl font-bold p-4">Orders</h2>
      <OrderForm order={selectedOrder} onSave={handleSave} />
      <div>
      <h2 className="text-3xl font-bold p-4">Orders</h2>
      <ListGroup>
        {orders.map((order) => (
          <ListGroupItem key={order.id} className="flex justify-between items-center">
            <div>
              <span className="font-semibold">Order ID:</span> {order.id} - 
              <span className="text-green-500">Total: ${order.total}</span>
            </div>
            <div className="flex space-x-2">
              <Button size="xs" onClick={() => setSelectedOrder(order)}>Edit</Button>
              <Button size="xs" color="failure" onClick={() => handleDelete(order.id)}>Delete</Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
      <Button className="self-center mt-4 mb-2" onClick={goBack}>Back to Products Page</Button>
    </div>
  );
};


