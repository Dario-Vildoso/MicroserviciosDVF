const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // Parsear datos de formularios
app.use(express.static('public')); // Servir archivos estáticos
app.set('view engine', 'ejs'); // Configurar EJS como motor de plantillas Página principal: listar productos
app.get('/', (req, res) => {
    const query = 'SELECT * FROM agenda';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('index', { usuarios: results });
    });
});
// Mostrar formulario para agregar producto
app.get('/add', (req, res) => {
    res.render('add');
});
// Procesar formulario para agregar producto
app.post('/add', (req, res) => {
const { Nombres, Apellidos, Fecha_Nacimiento, Direccion, Celular, Correo } = req.body;
const query = 'INSERT INTO agenda (nombres, apellidos, fecha_nacimiento, direccion, celular, correo) VALUES (?, ?, ?, ?, ?, ?)';
db.query(query, [Nombres, Apellidos, Fecha_Nacimiento, Direccion, Celular, Correo], (err) => {
if (err) {
return res.status(500).send(err);
}
res.redirect('/');
});
});
// Mostrar formulario para editar producto
app.get('/edit/:id', (req, res) => {
const { id } = req.params;
const query = 'SELECT * FROM agenda WHERE Id = ?';
db.query(query, [id], (err, results) => {
if (err) {
return res.status(500).send(err);
}
console.log(results[0]);
res.render('edit', { usuario: results[0] });
});
});
// Procesar formulario para editar producto
app.post('/edit/:id', (req, res) => {
const { id } = req.params;
const { Nombres, Apellidos, Fecha_Nacimiento, Direccion, Celular, Correo } = req.body;
const query = 'UPDATE agenda SET nombres = ?, apellidos = ?, fecha_nacimiento = ?, direccion = ?, celular = ?, correo = ? WHERE Id = ?';
db.query(query, [Nombres, Apellidos, Fecha_Nacimiento, Direccion, Celular, Correo, id], (err) => {
if (err) {
return res.status(500).send(err);
}
res.redirect('/');
});
});
// Eliminar producto
app.get('/delete/:id', (req, res) => {
const { id } = req.params;
const query = 'DELETE FROM agenda WHERE Id = ?';
db.query(query, [id], (err) => {
if (err) {
return res.status(500).send(err);
}
res.redirect('/');
});
});
// Iniciar servidor
app.listen(3000, () => {
console.log('Servidor corriendo en http://localhost:3000');
});