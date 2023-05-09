const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

// Obtener todas las notas
router.get("/", async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
});

// Obtener una nota por su ID
router.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.status(200).json(note);
});

// Crear una nueva nota
router.post("/", async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.status(200).json(note);
});

// Actualizar una nota existente
router.put("/:id", async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(note);
});

// Eliminar una nota existente
router.delete("/:id", async (req, res) => {
  const note = await Note.findByIdAndRemove(req.params.id);
  res.status(200).json(note);
});

module.exports = router;
