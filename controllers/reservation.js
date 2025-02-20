const { reservation } = require("../models/reservation");
const moment = require("moment");
const jwt = require("../services/jwt");


const { user } = require("../models/user");
const { seat } = require("../models/seat");
const { projection } = require("../models/projection");

const list = async (req, res) => {
  let userToList = req.user;

  const listReservation = await reservation.findOne({
    where: { id_Usuario: userToList.id },
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
      message: "No hay reservas actualmente",
    });
  }

  return res.status(200).send({
    status: "success",
    message: "Se cargaron la lista de reservas",
    listReservation,
  });
};

const listByProjections = async (req, res) => {
  try {
    const { id_Proyeccion } = req.params; 

    const listReservations = await reservation.findAll({
      where: { id_Proyeccion }, 

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },

    });

    if (!listReservations || listReservations.length === 0) {
      return res.status(404).send({
        status: "error",
        message: "No hay reservas para esa proyección",
      });
    }

    return res.status(200).json({
      status: "success",
      data: listReservations,
    });

  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};


const listByUsers = async (req, res) => {
  try {
    const { id_Usuario } = req.params; 

    const listReservations = await reservation.findAll({
      where: { id_Usuario },
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

    if (!listReservations || listReservations.length === 0) {
      return res.status(404).send({
        status: "error",
        message: "Todavia no tienes reservas",
      });
    }

    return res.status(200).json({
      status: "success",
      data: listReservations,
    });

  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const userParams = jwt.decodeToken(req.body.token);
    const seatParams = req.body.id_Butaca;
    const projectionParams = req.body.id_Proyeccion;

    if (!userParams || !seatParams || !projectionParams) {
      return res.status(400).send({
        status: "error",
        message: "Faltan datos para crear la reserva",
      });
    }

    const listReservationByProjection = await reservation.findAll({
      where: { id_Proyeccion: projectionParams },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    const userHasReservation = listReservationByProjection.some(
      (item) => item.id_Usuario === userParams.id
    );

    if (userHasReservation) {
      return res.status(400).send({
        status: "error",
        message: "Error, ya tienes una reserva para esta proyección.",
      });
    }

    const newReservation = await reservation.create({
      fecha: moment().format("DD-MM-YYYY"),
      id_Usuario: userParams.id,
      id_Butaca: seatParams,
      id_Proyeccion: projectionParams,
    });

    return res.status(201).send({
      status: "success",
      message: "Reserva creada exitosamente",
      newReservation,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Hubo un problema al crear la reserva",
      error: error.message,
    });
  }
};


const update = async (req, res) => {
  try {
    let reservationToUpdate = req.body;

    const reservationFind = await reservation.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!reservationFind) {
      return res.status(404).send({
        status: "error",
        message: "Reserva no encontrada",
      });
    }

    const reservationUpdated = await reservationFind.update(
      reservationToUpdate
    );

    return res.status(200).send({
      status: "success",
      message: "Se actualizó la reserva",
      reservationUpdated,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error al actualizar la reserva",
      error: error.message,
    });
  }
};

const eliminacion = async (req, res) => {
  try {
    const reservationFind = await reservation.findOne({
      where: {
        id: req.params.id,
      },
    });

    const reservationDeleted = await reservationFind.destroy(reservationFind);

    return res.status(200).send({
      status: "success",
      message: "Se elimino correctamente la reserva",
      reservationDeleted,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error, no se pudo eliminar la reserva",
      error,
    });
  }
};

module.exports = {
  list,
  create,
  update,
  eliminacion,
  listByProjections,
  listByUsers
};
