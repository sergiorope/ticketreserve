const express = require("express");
const cors = require("cors");
const { connectDB } = require("./conexion/mysql");

const app = express();
const puerto = 3800;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userRoutes = require("./routes/user");
const filmRoutes = require("./routes/film");



app.use("/user", userRoutes);
app.use("/film", filmRoutes);


connectDB();

app.listen(puerto, () => {
    console.log("Servidor de node corriendo en el puerto: " + puerto);
});
