import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../api';
import ProductForm from './productForm';

const ProductList = () => {
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
      <h2>Products</h2>
      <ProductForm product={selectedProduct} onSave={handleSave} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} (Stock: {product.stock})
            <button onClick={() => setSelectedProduct(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
