const mysql = require("mysql2/promise"); 
const { Sequelize } = require("sequelize");


const sequelize = new Sequelize('mysql://mysql:qwerty@localhost:3308/ticketreserve', {
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {

  try {
    const connection = await mysql.createConnection({
      host: "localhost",      
      user: "mysql",          
      password: "qwerty",    
      database: "ticketreserve", 
      port: 3308,             
    });

    console.log("Conexión exitosa a la base de datos de TicketReserve.");
    return connection; 

  } catch (error) {
    console.error("Error al conectar a la base de datos de TicketReserve:", error);
    throw error; 
  }
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
