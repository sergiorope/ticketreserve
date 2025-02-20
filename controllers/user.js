const { user } = require("../models/user");
const bcrypt = require("bcryptjs"); 
const jwt = require("../services/jwt");

const register = async (req, res) => {
  const params = req.body;

  try {
    let userToFind = await user.findOne({
      where: {
        email: params.email,
      },
    });

    if (!params.name || !params.surname || !params.email || !params.password) {
      return res.status(400).send({
        status: "error",
        message: "Error, los campos no pueden estar vacíos.",
      });
    }

    if (userToFind) {
      return res.status(400).send({
        status: "error",
        message: "Error, ese correo ya esta en uso.",
      });
    }

    const hashedPassword = await bcrypt.hash(params.password, 10); 
    params.password = hashedPassword;

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
      message: "Error, no existe un usuario con ese email",
    });
  }

  const pwd = bcrypt.compareSync(userToLogin.password, userToFind.password); 
  if (!pwd) {
    return res
      .status(400)
      .send({ status: "error", message: "Error, credenciales incorrectas." });
  }

  const token = jwt.createToken(userToFind);

  return res.status(200).send({
    status: "success",
    message: "Iniciaste sesión con éxito",
    user: userToFind,
    token: token,
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
    userUpdate: updatedUser,
  });
};

const userInfo = (req, res) => {
  const token = req.body.token;

  const userToken = jwt.decodeToken(token);

  return res.status(200).send({
    status: "success",
    userToken,
  });
};

module.exports = {
  register,
  login,
  update,
  userInfo,
};
