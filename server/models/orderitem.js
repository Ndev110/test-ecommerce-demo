"use strict";
module.exports = (sequelize, DataTypes) => {
  const orderItem = sequelize.define(
    "orderItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: "order",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "product",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {}
  );
  orderItem.associate = function (models) {
    orderItem.belongsTo(models.order, { foreignKey: "orderId" });
    orderItem.belongsTo(models.product, { foreignKey: "productId" });
  };
  return orderItem;
};
