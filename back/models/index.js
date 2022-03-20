require("dotenv").config();
//const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIAL,
  logging: false,
  define: {
      timestamps: false
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// All Models
db.users = require("./Users")(sequelize, Sequelize);
db.articles = require("./Articles")(sequelize, Sequelize);
db.comments = require("./Comments")(sequelize, Sequelize);

module.exports = db;
