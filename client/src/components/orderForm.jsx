import React, { useState, useEffect } from 'react';
import { createOrder, updateOrder } from '../api';
import {ProductList} from './productList'; // To display products for selection

 export const  OrderForm = ({ order, onSave }) => {
  const [items, setItems] = useState(order ? order.items : []);

  const handleAddItem = () => {
    setItems([...items, { productId: '', quantity: 1 }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { items };

    try {
      if (order) {
        await updateOrder(order.id, data);
      } else {
        await createOrder(data);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save order', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {items.map((item, index) => (
        <div key={index}>
          <select
            value={item.productId}
            onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
          >
            {/* Populate options dynamically */}
            <option value="">Select Product</option>
            {/* Add product options here */}
          </select>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
            placeholder="Quantity"
            min="1"
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>Add Item</button>
      <button type="submit">{order ? 'Update' : 'Create'} Order</button>
    </form>
  );
};


