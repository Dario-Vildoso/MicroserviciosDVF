var VerifyToken = require('./VerifyToken');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../user/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config');


// Crear usuario
router.post('/', function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    console.log(req.body.email);
    User.findOne({ "email": req.body.email })
        .then(usuarioExistente => {
            if (usuarioExistente) {
                console.log('El usuario ya existe:', usuarioExistente);
                return res.status(500).send(
                    { message: 'El usuario ya existe' }
                );
            } else {

                const nuevoUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    dateCreate: new Date(),
                    state: "active",
                    password: hashedPassword
                });
               // console.log(nuevoUser);

                nuevoUser.save();
                //});
                console.log("entro");
                return res.status(200).send(req.body);

            }
        });
});
// Listar todos usuarios 
router.get('/', function (req, res) {
    User.find().exec()
    .then  (users=>{
        res.status(200).send(users);
    });
});

// Obtener un usuario
router.get('/:id', function (req, res) {
    console.log(req.params.id);
    User.findById(req.params.id).exec()
        .then(usuarioExistente => {
            console.log(usuarioExistente);
        if (!usuarioExistente) return res.status(404).send("No user found.");
        res.status(200).send(usuarioExistente);
    });
});

// Eliminar logicamenteun usuario
router.delete('/:id', function (req, res) {
    console.log("inactivo");
    User.findByIdAndUpdate(req.params.id, { state: "inactive" }, { new: true }).exec()
    .then (UsuarioEliminado=> {
        res.status(200).send(UsuarioEliminado);
    });
});

// Actualizar un usuario
router.put('/:id', function (req, res) {
    //   console.log(req);
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
    .then (UsuarioActualizado=> {
        res.status(200).send(UsuarioActualizado);
    });
});
// add the middleware function
router.use(function (user, req, res, next) {
    res.status(200).send(user);
});

module.exports = router;