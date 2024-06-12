const express = require("express")//Importando la libreria
const app = express() //inicializamos la variable de lalibreria
const UsuarioController = require('../controllers/UsuarioControllers')//Importamos el controlador
const controller =  new UsuarioController(); //creando una instancia

//creamos nuestros servicios web
app.get('/usuario', controller.getUsuarios)// Obtengo todos los usuarios
app.post('/usuario', controller.createUsuario)// Creo un usuario
app.get('/usuario/: id', controller.getUsuarioById)//Consulto un usuario
app.put('/usuario/:id', controller.updateUsuario)// Actualizo un usuario
app.delete('/usuario/: id', controller.deleteUsuario)//Elimino un usuario

module.exports = app