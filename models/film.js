const { DataTypes, STRING } = require("sequelize");
const { sequelize } = require('../conexion/mysql'); 



const film = sequelize.define("peliculas", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  synopsis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


module.exports = { sequelize, film };
