const { order, product, orderItem } = require("../models");

const createOrder = async (req, res) => {
  const { items } = req.body;

  const transaction = await sequelize.transaction();
  try {
    const newOrder = await order.create({ total: 0 }, { transaction });
    let total = 0;

    for (let item of items) {
      const orderProduct = await product.findByPk(item.productId, {
        transaction,
      });
      if (!product) throw new Error(`product ID ${item.productId} not found`);

      const amount = product.price * item.quantity;
      total += amount;

      await orderItem.create(
        {
          orderId: newOrder.id,
          productId: orderProduct.id,
          quantity: item.quantity,
        },
        { transaction }
      );
    }

    await order.update({ total }, { transaction });
    await transaction.commit();

    res.json(order);
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

 const updateOrder = async (req, res) => {
  const { items } = req.body;

  const transaction = await sequelize.transaction();
  try {
    const order = await order.findByPk(req.params.id, { transaction });
    if (!order) return res.sendStatus(404);
    await orderItem.destroy({ where: { orderId: order.id }, transaction });

    let total = 0;

    for (let item of items) {
      const product = await product.findByPk(item.productId, { transaction });
      if (!product) throw new Error(`product ID ${item.productId} not found`);

      const amount = product.price * item.quantity;
      total += amount;

      await orderItem.create(
        {
          orderId: order.id,
          productId: product.id,
          quantity: item.quantity,
        },
        { transaction }
      );
    }

    await order.update({ total }, { transaction });
    await transaction.commit();

    res.json(order);
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await order.findAll({
      include: [
        {
          model: orderItem,
          as: "items",
          include: [{ model: product, as: "product" }],
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {createOrder, updateOrder, getOrders};
