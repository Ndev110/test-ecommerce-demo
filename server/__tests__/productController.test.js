const request = require('supertest');
const express = require('express');
const productController = require('../controllers/product.controller'); // Adjust the path as needed

const app = express();
app.use(express.json());

// Mock the routes
app.post('/products', productController.createProduct);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);
app.get('/products', productController.getProducts);

// Mock Sequelize models inside jest.mock
jest.mock('../models', () => {
  const Product = {
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
  };

  return {
    db: {
      sequelize: {
        models: {
          Product,
        },
      },
    },
  };
});

describe('Product Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /products', () => {
    it('should create a new product', async () => {
      const newProduct = { name: 'Test Product', price: 10.99, stock: 100 };
      const mockProduct = { ...newProduct, id: 1 };
      const Product = require('../models').db.sequelize.models.Product;
      Product.create.mockResolvedValue(mockProduct);

      const response = await request(app)
        .post('/products')
        .send(newProduct);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockProduct);
    });

    it('should return error if creation fails', async () => {
      const error = new Error('Creation failed');
      const Product = require('../models').db.sequelize.models.Product;
      Product.create.mockRejectedValue(error);

      const response = await request(app)
        .post('/products')
        .send({ name: 'Test Product', price: 10.99, stock: 100 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(error.message);
    });
  });

  describe('PUT /products/:id', () => {
    it('should update a product', async () => {
      const updatedProduct = { id: 1, name: 'Updated Product', price: 12.99, stock: 150 };
      const Product = require('../models').db.sequelize.models.Product;
      Product.update.mockResolvedValue([1]);
      Product.findOne.mockResolvedValue(updatedProduct);

      const response = await request(app)
        .put('/products/1')
        .send(updatedProduct);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedProduct);
    });

    it('should return error if product not found', async () => {
      const Product = require('../models').db.sequelize.models.Product;
      Product.update.mockResolvedValue([0]);

      const response = await request(app)
        .put('/products/1')
        .send({ name: 'Updated Product' });

      expect(response.status).toBe(500);
      expect(response.text).toBe('Product not found');
    });
  });

  describe('DELETE /products/:id', () => {
    it('should delete a product', async () => {
      const Product = require('../models').db.sequelize.models.Product;
      Product.destroy.mockResolvedValue(1);

      const response = await request(app)
        .delete('/products/1');

      expect(response.status).toBe(204);
      
    });

    it('should return error if product not found', async () => {
      const Product = require('../models').db.sequelize.models.Product;
      Product.destroy.mockResolvedValue(0);

      const response = await request(app)
        .delete('/products/1');

      expect(response.status).toBe(500);
      expect(response.text).toBe('Product not found');
    });
  });

  describe('GET /products', () => {
    it('should get all products', async () => {
      const products = [
        { id: 1, name: 'Product 1', price: 10.99, stock: 100 },
        { id: 2, name: 'Product 2', price: 12.99, stock: 150 },
      ];
      const Product = require('../models').db.sequelize.models.Product;
      Product.findAll.mockResolvedValue(products);

      const response = await request(app)
        .get('/products');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(products);
    });

    it('should return error if fetching products fails', async () => {
      const error = new Error('Fetch failed');
      const Product = require('../models').db.sequelize.models.Product;
      Product.findAll.mockRejectedValue(error);

      const response = await request(app)
        .get('/products');

      expect(response.status).toBe(500);
      expect(response.text).toBe(error.message);
    });
  });
});
