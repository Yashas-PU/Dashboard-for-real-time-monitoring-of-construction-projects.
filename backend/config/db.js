const { Sequelize } = require("sequelize");
require("dotenv").config(); // ✅ Load .env file

// ✅ Debugging: Check if environment variables are loaded correctly
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS ? "****" : "(empty)");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    port: process.env.DB_PORT || 3306, // ✅ Ensure correct port
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((error) => console.error("❌ Database connection failed:", error));

module.exports = sequelize;
