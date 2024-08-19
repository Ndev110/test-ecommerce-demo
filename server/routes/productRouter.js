const productRouter = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} = require("../controllers/product.controller");
const product = require("../models/product");

productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/", getProducts);

module.exports = productRouter;
