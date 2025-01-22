const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nombre: {type:String, required: true},
    email:  {type:String, required: true},
    telefono: {type:Number, required: true},
    edad: {type:Number, required: true},
})

const Usuarios = mongoose.model('Usuarios', usuarioSchema)

module.exports = Usuarios