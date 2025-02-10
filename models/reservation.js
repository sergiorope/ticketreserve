const { DataTypes } = require("sequelize");
const { sequelize } = require("../conexion/mysql");
const { user } = require("../models/user");
const { seat } = require("../models/seat");
const { projection } = require("../models/projection");

const reservation = sequelize.define("reservas", {

  fecha: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  id_Usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  id_Butaca: {
    type: DataTypes.INTEGER,
    references: {
      model: "butacas",
      key: "id",
    },
  },
  id_Proyeccion: {
    type: DataTypes.INTEGER,
    references: {
      model: "proyecciones",
      key: "id",
    },
  },
});

reservation.belongsTo(user, { foreignKey: "id_Usuario", as: "usuario" });
reservation.belongsTo(seat, { foreignKey: "id_Butaca", as: "butaca" });
reservation.belongsTo(projection, {
  foreignKey: "id_Proyeccion",
  as: "proyeccion",
});

module.exports = { sequelize, reservation };
