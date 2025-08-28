const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public')); 
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));

const tareaSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    estado: String,
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

const Tarea = mongoose.model('Tarea', tareaSchema);

app.get('/', async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.render('index', { tareas });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', async (req, res) => {
    try {
        const { titulo, descripcion, estado } = req.body;
        const nuevo = new Tarea({
            titulo: titulo,
            descripcion: descripcion,
            estado: estado
        });
        await nuevo.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/edit/:id', async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id);
        res.render('edit', { tarea });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/edit/:id', async (req, res) => {
    try {
        const { titulo, descripcion, estado } = req.body;
        await Tarea.findByIdAndUpdate(req.params.id, {
            titulo: titulo,
            descripcion: descripcion,
            estado: estado
        });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/delete/:id', async (req, res) => {
    try {
        await Tarea.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
