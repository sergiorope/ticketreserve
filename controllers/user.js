const { user } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../services/jwt");

const register = async (req, res) => {
  const params = req.body;

  const hashedPassword = await bcrypt.hash(params.password, 10);
  params.password = hashedPassword;

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

const login = async (req, res) => {
  let userToLogin = req.body;

  if (!userToLogin.email || !userToLogin.password) {
    return res.status(400).send({
      status: "error",
      message: "Faltan datos de login (email o contraseña)",
    });
  }

  let userToFind = await user.findOne({
    where: {
      email: userToLogin.email,
    },
  });

  if (!userToFind) {
    return res.status(400).send({
      status: "error",
      message: "Error, el usuario no existe",
    });
  }

  const pwd = bcrypt.compareSync(userToLogin.password, userToFind.password);

  if (!pwd) {
    return res
      .status(400)
      .send({ status: "error", message: "Credenciales incorrectas" });
  }

  const token = jwt.createToken(userToFind);

  return res.status(200).send({
    status: "success",
    message: "Iniciaste sesión con éxito",
    user: userToFind,
    token: token,
  });
};

const getUser = async (req, res) => {
  let userMe = req.user;

  return res.status(200).send({
    status: "success",
    message: "Usuario encontrado con éxito",
    user: userMe,
  });
};

const update = async (req, res) => {
  let userMe = req.user;

  let userToUpdate = req.body;

  const updatedUser = await user.update(userToUpdate, {
    where: { id: userMe.id },
  });

  return res.status(200).send({
    status: "success",
    message: "Se actualizo el usuario con éxito",
    userUpdate: userToUpdate,
  });
};

module.exports = {
  register,
  list,
  login,
  getUser,
  update,
};
