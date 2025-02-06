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

sequelize.sync()
  .then(() => {
    console.log("La base de datos ha sido sincronizada.");
  })
  .catch((error) => {
    console.error("No se pudo sincronizar la base de datos", error);
  });

module.exports = { sequelize, user };
