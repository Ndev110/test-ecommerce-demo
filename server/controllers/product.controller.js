const {
  db: {
    sequelize
  },
} = require("../models");

const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const newProduct = await sequelize.models.Product.create({
      name,
      price,
      stock,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await sequelize.models.Product.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedProduct = await product.findOne({ where: { id: id } });
      return res.status(200).json(updatedProduct);
    }
    throw new Error("Product not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await sequelize.models.Product.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(204).send("Product deleted");
    }
    throw new Error("Product not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await sequelize.models.Product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = { createProduct, updateProduct, deleteProduct, getProducts };
