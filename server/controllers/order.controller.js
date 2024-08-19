const {
  db: { sequelize },
} = require("../models");

const createOrder = async (req, res) => {
  const { items } = req.body;

  const transaction = await sequelize.transaction();
  try {
    const newOrder = await sequelize.models.Order.create({ total: 0 }, { transaction });
    let total = 0;

    for (let item of items) {
      const orderProduct = await sequelize.models.Product.findByPk(
        item.productId,
        {
          transaction,
        }
      );
      if (!orderProduct) throw new Error(`product ID ${item.productId} not found`);

      const amount = orderProduct.price * item.quantity;
      total += amount;

      await sequelize.models.OrderProduct.create(
        {
          orderId: newOrder.id,
          productId: orderProduct.id,
          quantity: item.quantity,
        },
        { transaction }
      );
    }

    await sequelize.models.Order.update({ total }, {  where: { id: newOrder.id }, transaction });
    await transaction.commit();

    res.json(newOrder);
  } catch (error) {
    console.log("-----------------_>",{error}); 
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  const { items } = req.body;

  const transaction = await sequelize.transaction();
  try {
    const order = await sequelize.models.Order.findByPk(req.params.id, {
      transaction,
    });
    if (!order) return res.sendStatus(404);
    await  sequelize.models.OrderProduct.destroy({ where: { orderId: order.id }, transaction });

    let total = 0;

    for (let item of items) {
      const product = await sequelize.models.Product.findByPk(item.productId, { transaction });
      if (!product) throw new Error(`product ID ${item.productId} not found`);

      const amount = product.price * item.quantity;
      total += amount;

      await sequelize.models.OrderProduct.create(
        {
          orderId: order.id,
          productId: product.id,
          quantity: item.quantity,
        },
        { transaction }
      );
    }

    await sequelize.models.Order.update({ total }, { transaction });
    await transaction.commit();

    res.json(order);
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await sequelize.models.Order.findAll({
      include: [
        {
          model: sequelize.models.Product,
          through: {
            model: sequelize.models.OrderProduct,
            attributes: ["quantity"],
          }
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { createOrder, updateOrder, getOrders };
