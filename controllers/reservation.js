const { reservation } = require("../models/reservation");
const moment = require("moment");

const { user } = require("../models/user");
const { seat } = require("../models/seat");
const { projection } = require("../models/projection");

const list = async (req, res) => {
  const listReservation = await reservation.findAll({
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "id_Usuario",
        "id_Butaca",
        "id_Proyeccion",
      ],
    },

    include: [
      {
        model: user,
        as: "usuario",
        attributes: ["name"],
      },

      {
        model: seat,
        as: "butaca",
        attributes: ["row", "column"],
      },

      {
        model: projection,
        as: "proyeccion",
        attributes: ["horario"],
      },
    ],
  });


  if (!listReservation) {
    return res.status(400).send({
      status: "error",
      message: "No hay reservas actualmente actualmente",
    });
  }

  return res.status(200).send({
    status: "success",
    message: "Se cargaron la lista de reservas",
    listReservation,
  });
};

const create = async (req, res) => {
  try {
    const userParams = req.user;
    const seatParams = req.params.id_Butaca;
    const projectionParams = req.params.id_Proyeccion;


    const newReservation = await reservation.create({
      fecha: moment().format('DD-MM-YYYY'),  
      id_Usuario: userParams.id,  
      id_Butaca: seatParams,  
      id_Proyeccion: projectionParams  
    });

    return res.status(201).send({
      status: 'success',
      message: 'Reserva creada exitosamente',
      newReservation
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: 'error',
      message: 'Hubo un problema al crear la reserva',
      error: error.message
    });
  }
};

module.exports = {
  list,
  create
};
