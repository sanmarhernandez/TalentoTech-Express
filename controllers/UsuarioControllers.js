const UserSchema = require("../models/usuario") // Accdemos a los datos del modelo
const bcrypt =require('bcrypt')// importamos la libreria de encriptacion
const jwt = require('jsonwebtoken')

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
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        var updateUser = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: hashedPassword,

        }
        await UserSchema.findByIdAndUpdate(id, updateUser, { new: true})
        .then((result) => { //cuando se ejecuta correctamente
            res.send({"status": "success", "message": "Usuario actualizado correctamente"})
        }).catch((error) => {//cuando hay un error
            res.send({ "status": "error", "message": error.message})
        })

        
    }

    async deleteUsuario(req, res){
        var id = req.params.id

        await UserSchema.deleteOne({_id: id})

        res.json({"status": "success", "message":"Usuario eliminado correctamente" })

    }

    async login(req, res){
        //capturo el correo y la contraseña ingresados
        var correo = req.body.correo;
        var password =req.body.password

        //Buscar el usuario por el correo
        var usuario = await UserSchema.findOne({correo})
        if (usuario){
            //comparar la contraseña ingresada con la registrada por el usuario
                                                //Ingresp             Almacenado [encriptado]
            var verificacionClave = await bcrypt.compare(password, usuario.password)
            //si la verificacion de la clave es exitosa
            if(verificacionClave){
                 // Creo un token con la informacion codificada del usuario

                usuario.password = null // para no mandar la contraseña en el token
                const token = jwt.sign({usuario}, 'secret',{expiresIn: '1h'})
                res.send({"status": "success",
                           "message": "Bienvenido" + usuario.nombre+ " " + usuario.apellidos,
                           "user_id": usuario._id,
                           "token": token
                     })
            }else{
                res.status(401).send({"status": "error", "message": "Datos invalidos"})
            }                                      
        }else{
            //cuando el correo ingresado no esta registrado
            res.status(401).send({"status": "error", "message": "El correo ingresado no existe"})
        }
    }

}

module.exports = UsuarioController