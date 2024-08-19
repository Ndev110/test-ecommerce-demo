import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../api';
import { Button, TextInput } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProductForm = ({ product, onSave }) => {
  const [formState, setFormState] = useState({
    name:  '',
    price:  '',
    stock:  ''
  });

  useEffect(() => {
    if (product) {
      setFormState({
        name: product.name,
        price: product.price,
        stock: product.stock
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form State on Submit:", formState); 
    const { name, price, stock } = formState;

    try {
      let response;
      if (product) {
        response = await updateProduct(product.id, { name, price, stock });
        toast.success('Product updated successfully!'); 
      } else {
        response = await createProduct({ name, price, stock });
        toast.success('Product created successfully!'); 
      }

  

      if (response.status === 201) {
        onSave();
      } 
    } catch (error) {
 
      console.error('Failed to save product', error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4"
      >
        <TextInput
          type="text"
          name="name"
          value={formState.name} 
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <TextInput
          type="number"
          name="price"
          value={formState.price} 
          onChange={handleChange}
          placeholder="Price"
          required
          min={1}
        />
        <TextInput
          type="number"
          name="stock"
          value={formState.stock || ''} 
          onChange={handleChange}
          placeholder="Stock"
          required
          min={1}
        />

        <Button
          type="submit"
          className="self-center mt-4 mb-2"
        >
          {product ? 'Update' : 'Add'} Product
        </Button>
      </form>
      <ToastContainer /> {/* This is required to display toast messages */}
    </>
  );
};
