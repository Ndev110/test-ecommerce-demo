"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {}
  );
  order.associate = function (models) {
    order.hasMany(models.orderItem, { foreignKey: "orderId" });
  };
  return order;
};
