"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL },
    stock: { type: DataTypes.INTEGER },
  });
  Product.associate = (models) => {
    Product.belongsToMany(models.Order, { through: models.OrderProduct, foreignKey: "productId", otherKey: "orderId" });
  };
  return Product;
};

// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Product extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       Product.belongsToMany(models.Order, {
//         through: models.OrderProduct,
//         foreignKey: "productId",
//         otherKey: "orderId",
//       });
//     }
//   }
//   Product.init(
//     {
//       name: DataTypes.STRING,
//       price: DataTypes.DECIMAL,
//       stock: DataTypes.INTEGER,
//     },
//     {
//       sequelize,
//       modelName: "Product",
//     }
//   );
//   return Product;
// };
