const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/calcular", (req, res) => {
  const { a, b, operacion } = req.body;
  let resultado;

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  switch (operacion) {
    case "sumar":
      resultado = numA + numB;
      break;
    case "restar":
      resultado = numA - numB;
      break;
    case "multiplicar":
      resultado = numA * numB;
      break;
    case "dividir":
      resultado = numB !== 0 ? numA / numB : "Error: División entre 0";
      break;
    default:
      resultado = "Operación inválida";
  }

  res.render("resultado", { a: numA, b: numB, operacion, resultado });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
