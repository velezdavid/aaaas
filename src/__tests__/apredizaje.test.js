const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Aprendizaje = require("../models/Aprendizaje");

// Pruebas para el controlador de Aprendizajes
describe("AprendizajeController", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://facci:facci@cluster0.kidus.mongodb.net/aprendizajes",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  });

  afterAll(async () => {
    await Aprendizaje.deleteMany({});
    await mongoose.connection.close();
  });

  describe("POST /api/aprendizajes", () => {
    it("debería crear un nuevo registro", async () => {
      const date = new Date();
      const response = await request(app)
        .post("/api/aprendizajes")
        .send({
          ID_Idioma: 1,
          ID_Instructor: 1,
          Fecha: "2023-01-01",
          Hora: "14:20",
          Numero_horas: 4,
          Nivel: "A4",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.ID_Idioma).toBe(1);
      expect(response.body.ID_Instructor).toBe(1);
      expect(response.body.Fecha).toBe("2023-01-01");
      expect(response.body.Hora).toBe("14:20");
      expect(response.body.Numero_horas).toBe(4);
      expect(response.body.Nivel).toBe("A4");
    });
  });

  describe("GET /api/aprendizajes", () => {
    it("debería devolver una lista de registros", async () => {
      const response = await request(app)
        .get("/api/aprendizajes")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
