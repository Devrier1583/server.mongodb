const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const Usuarios = require('./modeles/user')
const { error } = require('console')
const app = express()

app.use(express.json())

mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,

})

.then(()=>
    console.log('Conexion exitosa a la db')
)

.catch((error)=> console.log('Error de conexion a la db:', error))

app.post('/usuarios',async(req, res)=>{
    try{
        const {nombre, email, telefono, edad} = req.body
        const nuevoUsuario = new Usuarios({nombre, email, telefono, edad})
        await nuevoUsuario.save();
        res.status(201).json({
            message: 'Usuario creado con exito', usuario: nuevoUsuario
        })

    }
    catch(error){
        res.status(500).json({
            message: 'Usuario no almacenado en db', error
        })
    }
})

app.get('/usuarios', async(req,res)=>{
    try{
        const user = await Usuarios.find()
        res.status(200).json(user)
    }
    catch(error){
            res.status(500).json({
            message: 'Error al obtener el usuario', error
        })
    }
})
/**
 * Ruta raiz o principal
 */
app.get('/',function(req,res){
    res.json({succes:'Api conectada correctamente'})
})
const PORT = process.env.PORT

app.listen(PORT, ()=>{console.log(`Servidor escuchando en el puerto ${PORT}`)})