const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const db = require("./db");
const fs = require("fs");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

const initScript = fs.readFileSync(__dirname + "/init/init.sql", "utf8");
db.query(initScript, (err) => {
  if (err) {
    console.error("Error ejecutando init.sql:", err.message);
  } else {
    console.log("init.sql ejecutado correctamente.");
  }
});

app.get("/", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) throw err;
    res.render("index", { usuarios: results });
  });
});

app.get("/add", (req, res) => {
  res.render("form");
});

app.post("/add", (req, res) => {
  const { nombre, correo } = req.body;
  db.query("INSERT INTO usuarios (nombre, correo) VALUES (?, ?)", [nombre, correo], (err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
