var express = require('express');

var app = express();


var db =  require('./config/db');




var UserController = require('./routes/UserController');
var LoginController = require('./routes/LoginController');


app.use('/users', UserController);
app.use('/login', LoginController);

module.exports = app;