const { user } = require("../models/user"); 

const create = async (req, res) => {
  const params = req.body;

  try {
    const userToSave = await user.create(params);

    return res.status(201).send({
      status: "success",
      message: "Usuario creado con éxito",
      user: userToSave,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error, El usuario no pudo ser creado",
      error: error.message,
    });
  }
};

const list = async (req, res) => {
  try {
    const users = await user.findAll();

    if (!users) {
      return res.status(500).send({
        status: "error",
        message: "Error, no hay ningún usuario",
      });
    }

    return res.status(201).send({
      status: "success",
      message: "Lista de todos los usuarios con éxito",
      user: users,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error al cargar a todos los usuarios",
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  let id = req.params.id;

  try {
    let userToFind = await user.findOne({
      where: {
        id: id,
      },
    });

    if (!userToFind) {
      return res.status(400).send({
        status: "error",
        message: "Error, el usuario no existe",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Usuario encontrado con éxito",
      user: userToFind,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error al cargar al usuario",
      error: error.message,
    });
  }
};

module.exports = {
  create,
  list,
  getById,
};
