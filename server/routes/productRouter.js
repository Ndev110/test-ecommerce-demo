const productRouter = require("express").Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
