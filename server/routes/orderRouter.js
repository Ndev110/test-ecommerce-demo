const orderRouter = require("express").Router();
const {
  createOrder,
  updateOrder,
  getOrders,
} = require("../controllers/order.controller");

orderRouter.post("/", createOrder);
orderRouter.put("/:id", updateOrder);
orderRouter.get("/", getOrders);

module.exports = orderRouter;
