const mysql = require("mysql2/promise"); 

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

module.exports = {
  connectDB,
};
