require('dotenv').config(); // Load environment variables

module.exports = {
  development: {
    url: process.env.DATABASE_URL || '',
    dialect: 'postgres',
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port : process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
  }
};
