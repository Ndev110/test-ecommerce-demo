const orderRouter = require("express").Router();
const {
  createOrder,
  updateOrder,
  getOrders,
  deleteOrder
} = require("../controllers/order.controller");

orderRouter.post("/", createOrder);
orderRouter.put("/:id", updateOrder);
orderRouter.get("/", getOrders);
orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
