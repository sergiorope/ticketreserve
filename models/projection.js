const { DataTypes } = require("sequelize");
const { sequelize } = require("../conexion/mysql");

const { film } = require('../models/film'); 
const { screen }  = require('../models/screen');

const projection = sequelize.define("proyecciones", {
  horario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_Pelicula: {
    type: DataTypes.INTEGER,
    references: {
      model: "peliculas",
      key: "id",
    },
    allowNull: false,
  },
  id_Sala: {
    type: DataTypes.INTEGER,
    references: {
      model: "salas",
      key: "id",
    },
    allowNull: false,
  },
});

projection.belongsTo(film, { foreignKey: 'id_Pelicula', as: 'pelicula' });

projection.belongsTo(screen, { foreignKey: 'id_Sala', as: 'sala' });

module.exports = { sequelize, projection };
