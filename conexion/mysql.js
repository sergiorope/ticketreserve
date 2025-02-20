const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('mysql://mysql:qwerty@mysql_db:3306/ticketreserve', {
  dialect: 'mysql',
  logging: false,
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const connectDB = async (maxRetries = 5) => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const connection = await mysql.createConnection({
        host: "mysql_db",
        user: "mysql",
        password: "qwerty",
        database: "ticketreserve",
        port: 3306,
      });
      console.log("Conexión exitosa a la base de datos de TicketReserve.");
      return connection;
    } catch (error) {
      console.error(`Error al conectar (intento ${retries + 1}): ${error.message}`);
      retries++;
      await sleep(5000); 
    }
  }
  throw new Error("No se pudo conectar a la base de datos después de varios intentos.");
};

sequelize.sync()
  .then(() => {
    console.log("La base de datos ha sido sincronizada.");
  })
  .catch((error) => {
    console.error("No se pudo sincronizar la base de datos", error);
  });

module.exports = {
  connectDB,
  sequelize
};
