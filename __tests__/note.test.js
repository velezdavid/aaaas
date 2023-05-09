const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const Note = require("../src/models/Note");

// Pruebas para el controlador de notas
describe("NoteController", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://facci:facci@cluster0.kidus.mongodb.net/notes",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  });

  afterAll(async () => {
    await Note.deleteMany({});
    await mongoose.connection.close();
  });

  describe("POST /api/notes", () => {
    it("debería crear una nueva nota", async () => {
      const response = await request(app)
        .post("/api/notes")
        .send({
          title: "Nota de prueba",
          content: "Esta es una nota de prueba",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.title).toBe("Nota de prueba");
      expect(response.body.content).toBe("Esta es una nota de prueba");
    });
  });

  describe("GET /api/notes", () => {
    it("debería devolver una lista de notas", async () => {
      const response = await request(app)
        .get("/api/notes")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
