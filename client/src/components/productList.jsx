import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../api';
import {ProductForm} from './productForm';
import { Button,ListGroup, ListGroupItem  } from "flowbite-react";


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
 console.log("products")
 
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
    setProducts(products.filter((product) => product.id !== id));
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

      <div>
      <h2 className="text-3xl font-bold p-4">Products</h2>
      <ListGroup>
        {products.map((product) => (
          <ListGroupItem key={product.id} className="flex justify-between items-center">
            <div>
              <span className="font-semibold">{product.name}</span> - 
              <span className="text-green-500">${product.price}</span> 
              <span className="text-gray-500">(Stock: {product.stock})</span>
            </div>
            <div className="flex space-x-2">
              <Button size="xs" onClick={() => setSelectedProduct(product)}>Edit</Button>
              <Button size="xs" color="failure" onClick={() => handleDelete(product.id)}>Delete</Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
    
    </div>
  );
};


