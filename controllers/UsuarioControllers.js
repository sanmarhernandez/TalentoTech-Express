const UserSchema = require("../models/usuario") // Accdemos a los datos del modelo
const bcrypt =require('bcrypt')// importamos la libreria de encriptacion

//permite agrupar atributos y funciones
class UsuarioController {

    async getUsuarios (req, res) {
        var usuarios = await UserSchema.find();
        res.json(usuarios)
    }

    async createUsuario(req, res){

        //encriptando la contraseña
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        var nuevoUsuario = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: hashedPassword,//guarda la contraseña hasehada
        }

        await UserSchema(nuevoUsuario).save()
        .then((result) => { //cuando se ejecuta correctamente
            res.send({"status": "success", "message": "Usuario guardado correctamente"})
        }).catch((error) => {//cuando hay un error
            res.send({ "status": "error", "message": error.message})
        })

      
    }

    async getUsuarioById(req, res){
        var id = req.params.id
        var usuario = await UserSchema.findById(id)
        res.json(usuario)
    }

    async updateUsuario(req, res){

        var id = req.params.id;

        var updateUser = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: req.body.password,

        }
        await UserSchema.findByIdAndUpdate(id, updateUser, { new: true})
        .then((result) => { //cuando se ejecuta correctamente
            res.send({"status": "success", "message": "Usuario actualizado correctamente"})
        }).catch((error) => {//cuando hay un error
            res.send({ "status": "error", "message": error.message})
        })

        res.json({"status": "success","message": "Usuario actualizado correctamente "})
    }

    async deleteUsuario(req, res){
        var id = req.params.id

        await UserSchema.deleteOne({_id: id})

        res.json({"status": "success", "message":"Usuario eliminado correctamente" })

    }

}

module.exports = UsuarioController