//Modelos de las bases de datos
const mongoose = require('mongoose')
const {Schema} = mongoose

//creamos el modelo de la base de datos
const foro = new Schema({
    title: String,
    message: String,
})

//exportamos la base de datos
module.exports = mongoose.model('foro', foro)