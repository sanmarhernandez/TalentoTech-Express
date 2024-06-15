const CarroSchema = require("../models/Carro");

class CarroController {

    async getCarros(req, res){
        var carros = await CarroSchema.find();
        res.json(carros)
    }

    async getCarroById(req, res){
        var id = req.params.id
        var carro = await CarroSchema.findById(id)
        res.json(carro)
    }

    async createCarro(req, res){

        var nuevoCarro = {
            modelo: req.body.modelo,
            marca: req.body.marca,
            color: req.body.color,
            cilindraje: req.body.cilindraje,
            placa: req.body.placa,
            linea: req.body.linea,
            capacidad: req.body.capacidad,
    }
     await CarroSchema(nuevoCarro).save()
     .then((result) => { //cuando se ejecuta correctamente
        res.send({"status": "success", "message": "Carro guardado correctamente"})
    }).catch((error) => {//cuando hay un error
        res.status(400).send({ "status": "error", "message": error.message})
    })

  
    }

async updateCarro(req, res){

    var id = req.params.id;

    var nuevoCarro = {
        modelo: req.body.modelo,
        marca: req.body.marca,
        color: req.body.color,
        cilindraje: req.body.cilindraje,
        placa: req.body.placa,
        linea: req.body.linea,
        capacidad: req.body.capacidad,
    }
    await CarroSchema.findByIdAndUpdate(id, nuevoCarro, { new: true})
    .then((result) => { //cuando se ejecuta correctamente
        res.send({"status": "success", "message": "Carro actualizado correctamente"})
    }).catch((error) => {//cuando hay un error
        res.status(400).send({ "status": "error", "message": error.message})
    })

    } 

async deleteCarro(req, res){
    var id = req.params.id

    await CarroSchema.deleteOne({_id: id})

    res.json({"status": "success", "message":"Carro eliminado correctamente" })

    }
}
module.exports = CarroController