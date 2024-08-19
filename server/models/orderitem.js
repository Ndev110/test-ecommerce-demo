'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {});
  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  return OrderItem;
};
