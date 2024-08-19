'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  }, {});
  Order.associate = function(models) {
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
  };
  return Order;
};
