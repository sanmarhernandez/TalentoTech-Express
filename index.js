//Configuracion de express
const express = require("express")//Importando la libreria
const app = express() //inicializamos la variable de lalibreria
const port = 3000 // Definimps el puerto a usar

const mongoose =require('mongoose');// importa libreria mongoose

// Obtengo la cadena de conexion del archivo .env
require('dotenv').config()
const DB_CONNECTION = process.env.DB_CONNECTION || ''
mongoose.connect(DB_CONNECTION)//creo la cadena de conexin

//Importamos las rutas del otro archivo
app.use(express.urlencoded({extended: true}))//Acceder a la informacion de las urls
app.use(express.json())//analizar informacion en formato JSON
const UserRoutes = require('./routes/UserRoutes')
app.use('/', UserRoutes)


//Creando el servicio Web
//Funcionalidad de nuestra api
//[get, post, put, patch, delet]
// res->Response -> Reespuesta
//req .> Request -> Informacion de entrada
app.get('/', (req, res) => {
    // Muestra en pantalla Hello world
    res.send("Hello word")
})

app.get('/saludar', (req, res) => {
    res.send("Hola")
})
//servicio web con parametros
app.get('/saludar/:nombre', (req, res) => {
    //recibiendo parametro de la URL
    var nombre =req.params.nombre
    res.send("Hola " + nombre)
})
app.get('/saludar/:nombre/:edad', (req, res) => {
    //recibiendo parametro de la URL
    var nombre =req.params.nombre
    var edad = req.params.edad
    res.send("Hola, me llamo  " + nombre + " y tengo " + edad) 
})
app.get('/mascotas/:tipo', (req, res) => {
    var tipo =req.params.tipo
    var animal = ""
    if(tipo == "perro"){
        animal = "guau"
    }else if(tipo == "gato"){
        animal = "miau"
    }else if (tipo == "pajaro"){
        animal = "pio pio"
    }else if(tipo == "serpiente"){
        animal = "Zssssss"
    }else{
        animal = "No conozco el animal"
    }
    res.send(animal)
    
})

//API REST
//Solicitud get
/*app.get(/usuario', (req,res) => {
    res.send("Estoy consultando un usuario")
})*/

//Solicitud por post
/*app.post('/usuario', (req,res) => {
    res.send("Estoy creando un usuario")
})
//Solicitud por put
app.put ('/usuario', (req, res) => {
    res.send("Estoy actualizando un ususario por PUT")//actualizando toda la informacion del usuario
})
//Solicitud por patch
app.patch('/usuario', (req, res) =>{
    res.send("Estoy actualizando un usuario con PATCH")// actualizando un dato especifico del usuario
})
//Solicitud por delete
app.delete('/usuario', (req, res) =>{
    res.send("Estoy eliminando un usuario")
})
//Ejecutamos en el servidor
app.listen(port, () => {
    console.log("lisen on " + port)
})


app.get('/despedirse/:nombre', (req, res) => {
    var nombre =req.params.nombre
     res.send("Adios "  + nombre)

})  

app.get('/despedirse/:nombre/edad', (req, res) => {
    var nombre =req.params.nombre
    var edad = req.params.edad
     res.send("Adios "  + nombre + "Espero estes muy bien")

}) 
app.get('/despedirse', (req, res) => {
    res.send("Adios")

})    

app.get('/Gato', (req, res) => {
    res.send("Miau")

})    

app.get('/Vaca', (req, res) => {
    res.send("Muuu")

})    

app.get('/Perro', (req, res) => {
    res.send("Guao")

})*/


// Ejecutamos el servidor
app.listen(port, () => {
    console.log("Listen on " + port)
})