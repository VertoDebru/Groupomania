require("dotenv").config();
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
db.jobs = require("./Jobs")(sequelize, Sequelize);
db.likes = require("./Likes")(sequelize, Sequelize);

// Associated models
const keyAuthor = { name: 'authorId', allowNull: false };
const keyArticle = { name: 'articleId', allowNull: false };
const keyJob = { name: 'jobId', allowNull: false };
// Jobs
db.jobs.hasOne(db.users, {foreignKey: keyJob});
db.users.belongsTo(db.jobs, {foreignKey: keyJob});
// Articles
db.users.hasMany(db.articles, {foreignKey: keyAuthor});
db.articles.belongsTo(db.users, {foreignKey: keyAuthor});
// Comments ...
// ... associate on users table.
db.users.hasMany(db.comments, {foreignKey: keyAuthor});
db.comments.belongsTo(db.users, {foreignKey: keyAuthor});
// ... associate on articles table.
db.articles.hasMany(db.comments, {foreignKey: keyArticle});
db.comments.belongsTo(db.articles, {foreignKey: keyArticle});
// Likes
db.articles.hasMany(db.likes, {foreignKey: keyArticle});
db.likes.belongsTo(db.articles, {foreignKey: keyArticle, onDelete: 'CASCADE' });

module.exports = db;
