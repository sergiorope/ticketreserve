const { screen } = require("../models/screen");

const list = async (req, res) => {
  const listScreen = await screen.findAll();

  if(!listScreen){
    return res.status(400).send({
      status: "error",
      message: "No hay salas actualmente",
    });

  }

  return res.status(200).send({
    status: "success",
    message: "Se cargaron la lista de salas",
    listFilms,
  });
};

module.exports = {
  list,
};
