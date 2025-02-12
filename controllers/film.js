const { film } = require("../models/film");

const list = async (req, res) => {
  const listFilms = await film.findAll();

  if (!listFilms) {
    return res.status(400).send({
      status: "error",
      message: "No hay peliculas actualmente",
    });
  }

  return res.status(200).send({
    status: "success",
    message: "Se cargaron la lista de peliculas",
    listFilms,
  });
};

module.exports = {
  list,
};
