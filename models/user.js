const { DataTypes } = require("sequelize");
const { sequelize } = require('../conexion/mysql'); 



const user = sequelize.define("usuarios", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});



module.exports = { sequelize, user };
