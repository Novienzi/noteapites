const express = require('express');
const app = express.Router()

const UserController = require('../../controller/userController');


app.post('/register', UserController.register);
app.post('/login', UserController.login);






module.exports = app