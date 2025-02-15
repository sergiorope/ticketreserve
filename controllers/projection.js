const { projection } = require("../models/projection");

const { film } = require("../models/film");
const { screen } = require("../models/screen");

const list = async (req, res) => {
  try {
    const projectionList = await projection.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "id_Pelicula", "id_Sala"],
      },

      include: [
        {
          model: film,
          as: "pelicula",
          attributes: ["name"],
        },
        {
        model: film,
        as: "pelicula",
        attributes: ["imageUrl"],
        },
        {
          model: screen,
          as: "sala",
          attributes: ["name"],
        },
      ],
    });

    if (!projectionList || projectionList.length === 0) {
      return res.status(400).send({
        status: "error",
        message: "No hay proyecciones actualmente",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Se cargaron la lista de proyecciones",
      projectionList,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error al obtener las proyecciones",
      error: error.message,
    });
  }
};

module.exports = {
  list,
};
