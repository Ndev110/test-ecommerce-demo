import React, { useState, useEffect } from 'react';
import { createOrder, updateOrder } from '../api';
import {ProductList} from './productList'; // To display products for selection
import { Button, TextInput,Label,Select } from "flowbite-react";
import { fetchProducts } from '../api';

 export const  OrderForm = ({ order, onSave  }) => {
  const [items, setItems] = useState(order ? order.items : []);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    loadProducts();
  }, []);
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
      

        <div className="max-w-md">
        <div className="mb-2 block text-slate-100">
          <Label className="text-slate-100" htmlFor="products" value="Select product" />
        </div>
        <Select
            id="products"
            required
            value={item.productId}
            onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
          >
            <option value="item.productId">Select Product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
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


