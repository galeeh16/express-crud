const Sequelize = require("sequelize");
const db = require("../config/db");

const User = db.define(
  "user",
  {
    username: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
  },
  {
    // gunakan ini agar nama table tidak diakhiri dengan s
    freezeTableName: true,
  }
);

module.exports = User;
