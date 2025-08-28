const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public')); 
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/bd_ventas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const agendaSchema = new mongoose.Schema({
    nombres: String,
    apellidos: String,
    fecha_nacimiento: Date,
    direccion: String,
    celular: String,
    correo: String
});

const Agenda = mongoose.model('Agenda', agendaSchema);

app.get('/', async (req, res) => {
    try {
        const usuarios = await Agenda.find();
        res.render('index', { usuarios });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', async (req, res) => {
    try {
        const { Nombres, Apellidos, Fecha_Nacimiento, Direccion, Celular, Correo } = req.body;
        const nuevo = new Agenda({
            nombres: Nombres,
            apellidos: Apellidos,
            fecha_nacimiento: Fecha_Nacimiento,
            direccion: Direccion,
            celular: Celular,
            correo: Correo
        });
        await nuevo.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/edit/:id', async (req, res) => {
    try {
        const usuario = await Agenda.findById(req.params.id);
        res.render('edit', { usuario });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/edit/:id', async (req, res) => {
    try {
        const { Nombres, Apellidos, Fecha_Nacimiento, Direccion, Celular, Correo } = req.body;
        await Agenda.findByIdAndUpdate(req.params.id, {
            nombres: Nombres,
            apellidos: Apellidos,
            fecha_nacimiento: Fecha_Nacimiento,
            direccion: Direccion,
            celular: Celular,
            correo: Correo
        });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/delete/:id', async (req, res) => {
    try {
        await Agenda.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
