const express = require("express");
const Aprendizaje = require("../models/Aprendizaje");
const router = express.Router();

// Obtener todas las aprendizajes
router.get("/", async (req, res) => {
  try {
    const aprendizajes = await Aprendizaje.find();
    res.status(200).json(aprendizajes);
  } catch (err) {
    console.error("Error al obtener los registros de Aprendizaje", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Obtener una aprendizaje por su ID
router.get("/:id", async (req, res) => {
  try {
    const aprendizaje = await Aprendizaje.findById(req.params.id);
    if (aprendizaje) {
      res.status(200).json(aprendizaje);
    } else {
      res
        .status(404)
        .json({ message: "Registro de Aprendizaje no encontrado" });
    }
  } catch (err) {
    console.error("Error al obtener el registro de Aprendizaje", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Crear una nueva aprendizaje
router.post("/", async (req, res) => {
  try {
    const aprendizaje = new Aprendizaje(req.body);
    await aprendizaje.save();
    res.status(200).json(aprendizaje);
  } catch (err) {
    console.error("Error al crear el registro de Aprendizaje", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Actualizar una aprendizaje existente
router.put("/:id", async (req, res) => {
  try {
    const aprendizaje = await Aprendizaje.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (aprendizaje) {
      res.status(200).json(aprendizaje);
    } else {
      res
        .status(404)
        .json({ message: "Registro de Aprendizaje no encontrado" });
    }
  } catch (err) {
    console.error("Error al actualizar el registro de Aprendizaje", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Eliminar una aprendizaje existente
router.delete("/:id", async (req, res) => {
  try {
    const aprendizaje = await Aprendizaje.findByIdAndDelete(req.params.id);
    if (aprendizaje) {
      res
        .status(200)
        .json({ message: "Registro de Aprendizaje eliminado exitosamente" });
    } else {
      res
        .status(404)
        .json({ message: "Registro de Aprendizaje no encontrado" });
    }
  } catch (err) {
    console.error("Error al eliminar el registro de Aprendizaje", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
