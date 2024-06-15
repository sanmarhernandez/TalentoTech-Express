const express = require("express")//Importando la libreria
const app = express() //inicializamos la variable de lalibreria
const CarroController = require('../controllers/CarroController')//Importamos el controlador
const controller =  new CarroController(); //creando una instancia

//creamos nuestros servicios web
app.get('/carro', controller.getCarros)
app.post('/carro', controller.createCarro)
app.get('/carro/:id', controller.getCarroById)
app.put('/carro/:id', controller.updateCarro)
app.delete('/carro/:id', controller.deleteCarro)

module.exports = app