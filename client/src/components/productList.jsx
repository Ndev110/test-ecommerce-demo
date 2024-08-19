import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../api';
import {ProductForm} from './productForm';
import { Button } from "flowbite-react";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleSave = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to refresh products', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold p-4"> Products</h2>
      <ProductForm product={selectedProduct} onSave={handleSave} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} (Stock: {product.stock})
            <Button onClick={() => setSelectedProduct(product)}>Edit</Button>
            <Button onClick={() => handleDelete(product.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};


