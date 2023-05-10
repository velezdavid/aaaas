const mongoose = require("mongoose");

// Definir esquema del modelo Aprendizaje
const aprendizajeSchema = new mongoose.Schema({
  ID_Idioma: Number,
  ID_Instructor: Number,
  Fecha: String,
  Hora: String,
  Numero_horas: Number,
  Nivel: String
});
const Aprendizaje = mongoose.model("Aprendizaje", aprendizajeSchema);
module.exports = Aprendizaje;