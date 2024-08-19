const request = require('supertest');
const express = require('express');
const orderController = require('../controllers/order.controller'); // Adjust the path as needed

const app = express();
app.use(express.json());

// Mock the routes
app.post('/orders', orderController.createOrder);
app.put('/orders/:id', orderController.updateOrder);
app.get('/orders', orderController.getOrders);
app.delete('/orders/:id', orderController.deleteOrder);

// Mock Sequelize models inside jest.mock
jest.mock('../models', () => {
  const Order = {
    create: jest.fn(),
    update: jest.fn(),
    findByPk: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
  };

  const Product = {
    findByPk: jest.fn(),
  };

  const OrderProduct = {
    create: jest.fn(),
    destroy: jest.fn(),
  };

  const sequelize = {
    transaction: jest.fn().mockImplementation(() => ({
      commit: jest.fn(),
      rollback: jest.fn(),
    })),
    models: {
      Order,
      Product,
      OrderProduct,
    },
  };

  return {
    db: {
      sequelize,
    },
  };
});

describe('Order Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /orders', () => {
    it('should create a new order', async () => {
      const items = [{ productId: 1, quantity: 2 }];
      const mockProduct = { id: 1, price: 10 };
      const mockOrder = { id: 1, total: 20 };
      const Order = require('../models').db.sequelize.models.Order;
      const Product = require('../models').db.sequelize.models.Product;
      const OrderProduct = require('../models').db.sequelize.models.OrderProduct;

      Order.create.mockResolvedValue(mockOrder);
      Product.findByPk.mockResolvedValue(mockProduct);
      OrderProduct.create.mockResolvedValue();
      Order.update.mockResolvedValue();

      const response = await request(app)
        .post('/orders')
        .send({ items });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrder);
    });

    it('should return error if product not found', async () => {
      const items = [{ productId: 1, quantity: 2 }];
      const error = new Error('product ID 1 not found');
      const Product = require('../models').db.sequelize.models.Product;

      Product.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .post('/orders')
        .send({ items });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(error.message);
    });
  });

  describe('PUT /orders/:id', () => {
    it('should update an existing order', async () => {
      const items = [{ productId: 1, quantity: 2 }];
      const mockProduct = { id: 1, price: 10 };
      const mockOrder = { id: 1, total: 20 };
      const Order = require('../models').db.sequelize.models.Order;
      const Product = require('../models').db.sequelize.models.Product;
      const OrderProduct = require('../models').db.sequelize.models.OrderProduct;

      Order.findByPk.mockResolvedValue(mockOrder);
      Product.findByPk.mockResolvedValue(mockProduct);
      OrderProduct.destroy.mockResolvedValue();
      OrderProduct.create.mockResolvedValue();
      Order.update.mockResolvedValue();

      const response = await request(app)
        .put('/orders/1')
        .send({ items });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrder);
    });

    it('should return error if order not found', async () => {
      const items = [{ productId: 1, quantity: 2 }];
      const Order = require('../models').db.sequelize.models.Order;

      Order.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .put('/orders/1')
        .send({ items });

      expect(response.status).toBe(404);
    });

    it('should return error if product not found', async () => {
      const items = [{ productId: 1, quantity: 2 }];
      const mockOrder = { id: 1 };
      const Order = require('../models').db.sequelize.models.Order;
      const Product = require('../models').db.sequelize.models.Product;

      Order.findByPk.mockResolvedValue(mockOrder);
      Product.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .put('/orders/1')
        .send({ items });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('product ID 1 not found');
    });
  });

  describe('GET /orders', () => {
    it('should get all orders', async () => {
      const orders = [{ id: 1, total: 20 }];
      const Order = require('../models').db.sequelize.models.Order;

      Order.findAll.mockResolvedValue(orders);

      const response = await request(app)
        .get('/orders');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(orders);
    });

    it('should return error if fetching orders fails', async () => {
      const error = new Error('Fetch failed');
      const Order = require('../models').db.sequelize.models.Order;

      Order.findAll.mockRejectedValue(error);

      const response = await request(app)
        .get('/orders');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(error.message);
    });
  });

  describe('DELETE /orders/:id', () => {
    it('should delete an existing order', async () => {
      const mockOrder = { id: 1 };
      const Order = require('../models').db.sequelize.models.Order;
      const OrderProduct = require('../models').db.sequelize.models.OrderProduct;

      Order.findByPk.mockResolvedValue(mockOrder);
      OrderProduct.destroy.mockResolvedValue();
      Order.destroy.mockResolvedValue();

      const response = await request(app)
        .delete('/orders/1');

      expect(response.status).toBe(204);
    });

    it('should return error if order not found', async () => {
      const Order = require('../models').db.sequelize.models.Order;

      Order.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .delete('/orders/1');

      expect(response.status).toBe(404);
    });

    it('should return error if deletion fails', async () => {
      const mockOrder = { id: 1 };
      const Order = require('../models').db.sequelize.models.Order;
      const OrderProduct = require('../models').db.sequelize.models.OrderProduct;
      const error = new Error('Deletion failed');

      Order.findByPk.mockResolvedValue(mockOrder);
      OrderProduct.destroy.mockRejectedValue(error);

      const response = await request(app)
        .delete('/orders/1');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(error.message);
    });
  });
});
