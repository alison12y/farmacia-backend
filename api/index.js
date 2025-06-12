const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de ejemplo
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hola desde Express en Vercel!" });
});

module.exports.handler = serverless(app);
