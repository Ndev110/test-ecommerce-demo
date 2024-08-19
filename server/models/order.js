"use strict";

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    total: { type: DataTypes.DECIMAL },
  });
  Order.associate = (models) => {
    Order.belongsToMany(models.Product, { through: models.OrderProduct, foreignKey: "orderId", otherKey: "productId" });
  };
  return Order;
};

// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Order extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Order.belongsToMany(models.Product, {
//         through: models.OrderProduct,
//         foreignKey: "orderId",
//         otherKey: "productId",
//       });
//     }

//     async getTotalCost() {
//       const products = await this.getProducts({
//         include: [
//           {
//             model: sequelize.models.OrderProduct,
//             as: "orderProducts",
//             attributes: ["quantity"],
//           },
//         ],
//       });

//       let total = 0;
//       products.forEach((product) => {
//         total += product.price * product.orderProducts.quantity;
//       });

//       return total;
//     }
//   }
//   Order.init(
//     {
//       total: DataTypes.DECIMAL,
//     },
//     {
//       sequelize,
//       modelName: "Order",
//     }
//   );
//   return Order;
// };
