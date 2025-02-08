const film = require("../models/film");


const list = async (req, res) => {

    


  res.status(200).send({
    status: "success",
    message: "Este es el controlador de lista de peliculas",
  });
};

module.exports = {
  list,
};
