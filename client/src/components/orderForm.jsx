import React, { useState, useEffect } from 'react';
import { createOrder, updateOrder } from '../api';
import {ProductList} from './productList'; // To display products for selection
import { Button, TextInput,Label,Select } from "flowbite-react";

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
        // <div key={index}>
        //   <p>Select product</p>
          
        //   <select
        //   placeholder="Select Product"
        //     value={item.productId}
        //     onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
        //     className='m-2'
        //   >
       
        //     <option value="">Select Product</option>
         
        //   </select>
         
        // </div>

        <div className="max-w-md">
        <div className="mb-2 block text-slate-100">
          <Label className="text-slate-100" htmlFor="products" value="Select product" />
        </div>
        <Select id="products" required>
          <option>water</option>
          <option>glass</option>
          <option>box</option>
          <option>tissues</option>
        </Select>
        <p>Qunatity</p>
          <TextInput
            type="number"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
            placeholder="Quantity"
            min="1"
            required
            className='m-2'
          />
      </div>
      
      ))}
     <div className="flex justify-center ">
  <Button className='p-2 mt-4 mb-2 m-2' type="button" onClick={handleAddItem}>Add Item</Button>
  <Button className='p-2 mt-4 mb-2 m-2' type="submit">{order ? 'Update' : 'Create'} Order</Button>
</div>
     
    </form>
  );
};


