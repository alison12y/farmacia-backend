const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Client } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// conectamos al iniciar
client.connect()
  .then(() => console.log('Conectado a CockroachDB'))
  .catch(err => console.error('Error de conexión', err));

// Ruta de prueba
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hola desde Express en Vercel!" });
});

// Ruta de prueba a base de datos
app.get("/api/productos", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM productos'); 
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});

module.exports.handler = serverless(app);
