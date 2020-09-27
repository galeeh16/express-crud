const sequelize = require("sequelize");

const db = new sequelize("crud_express", "root", "", {
  dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
  port: 3306, // or 5432 (for postgres)
});

db.authenticate().then(
  function () {
    console.log("Connection has been established successfully.");
  },
  function (err) {
    console.log("Unable to connect to the database:", err);
  }
);

db.sync({});

module.exports = db;
