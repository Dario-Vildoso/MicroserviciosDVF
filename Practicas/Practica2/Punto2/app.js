const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const db = require("./db");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// Página principal: lista usuarios
app.get("/", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) throw err;
    res.render("index", { usuarios: results });
  });
});

// Mostrar formulario
app.get("/add", (req, res) => {
  res.render("form");
});

// Insertar usuario
app.post("/add", (req, res) => {
  const { nombre, correo } = req.body;
  db.query("INSERT INTO usuarios (nombre, correo) VALUES (?, ?)", [nombre, correo], (err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Eliminar usuario
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
