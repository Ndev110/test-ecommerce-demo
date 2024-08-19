'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Product.associate = function(models) {
    Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
  };
  return Product;
};
