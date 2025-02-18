const { DataTypes } = require("sequelize");
const { sequelize } = require('../conexion/mysql'); 
const { screen }  = require('../models/screen');



const seat = sequelize.define("butacas", {
  row: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  column: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_Sala: {
    type: DataTypes.INTEGER,
    references: {
      model: "salas",
      key: "id",
    }
}
});

seat.belongsTo(screen, { foreignKey: 'id_Sala', as: 'sala' });



module.exports = { sequelize, seat };
