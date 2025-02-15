const jwt = require("jwt-simple");
const moment = require("moment");

const secret = "CLAVE_SECRETA_TiCkeTReSERVe_2025_sERVIce";

const createToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };

  return jwt.encode(payload, secret);
};

const decodeToken = (token) => {
  const user = jwt.decode(token, secret);

  return user;
};

module.exports = {
  secret,
  createToken,
  decodeToken
};
