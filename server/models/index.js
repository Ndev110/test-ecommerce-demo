"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];
const db = {};

if (!config || !config.url) {
  throw new Error("Database configuration is missing or incomplete.");
}

const sequelize = new Sequelize(config.url, {
  host: config.host || "localhost",
  dialect: "postgres",
  port: config.port || 5432,
  logging: console.log,
});

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".js" &&
//       file.indexOf(".test.js") === -1
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

db.Product = require("./product")(sequelize, Sequelize.DataTypes);
db.Order = require("./order")(sequelize, Sequelize.DataTypes);
db.OrderProduct = require("./orderproduct.js")(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Order.associate({ OrderProduct, Product });
// Product.associate({ Order, OrderProduct });
// OrderProduct.associate({ Order, Product });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function connectToDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

module.exports = { db, connectToDatabase };
