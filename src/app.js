const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

// Configurar variables de entorno
dotenv.config();

// Configurar middlewares
app.use(express.json());
app.use(cors());

// Configurar rutas
const noteRouter = require("../src/controllers/noteController");
app.use("/api/notes", noteRouter);

// Configurar base de datos
mongoose.connect("mongodb+srv://facci:facci@cluster0.kidus.mongodb.net/notes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Conectado a la base de datos"));

// Arrancar servidor
const server = app.listen(process.env.PORT || 3100, () => {
  console.log(`Servidor iniciado en el puerto ${server.address().port}`);
});

module.exports = app;
