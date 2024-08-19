"use strict";

const product = require("./product");

module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define("OrderProduct", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0, // assuming quantity cannot be negative
      },
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Order",
        key: "id",
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Product",
        key: "id",
      }
    }
  });
  return OrderProduct;
};

// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class OrderProduct extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       OrderProduct.belongsTo(models.Order, {
//         foreignKey: "orderId",
//         as: "order",
//         onDelete: "CASCADE",
//         onUpdate: "CASCADE",
//       });
//       OrderProduct.belongsTo(models.Product, {
//         foreignKey: "productId",
//         as: "product",
//         onDelete: "CASCADE",
//         onUpdate: "CASCADE",
//       });
//     }
//   }
//   OrderProduct.init(
//     {
//       orderId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "Orders",
//           key: "id",
//         },
//       },
//       productId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "Products",
//           key: "id",
//         },
//       },
//       quantity: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0,
//         validate: {
//           isInt: true,
//           min: 0, // assuming quantity cannot be negative
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: "OrderProduct",
//       timestamps: true, // Enable automatic createdAt and updatedAt fields
//     }
//   );
//   return OrderProduct;
// };
