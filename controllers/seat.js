const { seat } = require("../models/seat");
const { screen } = require("../models/screen");

const list = async (req, res) => {
  const listSeat = await seat.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", "id_Sala"],
    },

    include: [
      {
        model: screen,
        as: "sala",
        attributes: ["name"],
      },
    ],
  });

  if (!listSeat) {
    return res.status(400).send({
      status: "error",
      message: "No hay butacas actualmente",
    });
  }

  return res.status(200).send({
    status: "success",
    message: "Se cargaron la lista de butacas",
    listSeat,
  });
};


const listByScreen = async (req, res) => {
  try {
    const { id_Sala } = req.params; 

    const listSeat = await seat.findAll({
      where: { id_Sala }, 

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },

    });

    if (!listSeat || listSeat.length === 0) {
      return res.status(404).send({
        status: "error",
        message: "No hay butacas para esta sala",
      });
    }

    return res.status(200).json({
      status: "success",
      data: listSeat,
    });

  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};



const update = async (req, res) => {
  try {
    let seatToUpdate = req.body;

    const seatFind = await seat.findOne({
      where: {
        id: req.params.id,
      },
    });

    const seatUpdated = await seatFind.update(seatToUpdate);

    return res.status(200).send({
      status: "success",
      message: "Se actualizo la butaca con exito",
      seatUpdated,
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: "Error, no se actualizar la butaca",
      error,
    });
  }
};



module.exports = {
  list,
  update,
  listByScreen
};
