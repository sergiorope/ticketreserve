const { DataTypes } = require("sequelize");
const { sequelize } = require('../conexion/mysql'); 



const screen = sequelize.define("sala", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});



module.exports = { sequelize, screen };
