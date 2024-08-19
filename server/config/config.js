require('dotenv').config(); // Load environment variables

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};