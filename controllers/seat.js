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
};
