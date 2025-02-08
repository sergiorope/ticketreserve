const { DataTypes } = require("sequelize");
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
  }
});

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log("La base de datos ha sido sincronizada con cambios.");
  })
  .catch((error) => {
    console.error("No se pudo sincronizar la base de datos", error);
  });

module.exports = { sequelize, film };
