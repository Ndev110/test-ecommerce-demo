"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize } = require('sequelize');
const process = require("process");
const basename = path.basename(__filename);
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js");
const db = {};



  const database = new Sequelize(
    config.database.name,
    config.database.username,
    config.database.password,
    {
      host: config.database.host || "localhost",
      dialect: config.database.dialect || "postgres",
      port: config.database.port || 5432,
      logging: console.log,
    }
  );


fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      database,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = database;
db.Sequelize = database;

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
