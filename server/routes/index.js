const orderRouter = require("./orderRouter");
const productRouter = require("./productRouter");

const router = require("express").Router();

router.use("/products", productRouter);
router.use("/orders", orderRouter);

module.exports = router;
