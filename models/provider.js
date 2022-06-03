//Modelos de las bases de datos
const mongoose = require('mongoose')
const {Schema} = mongoose

//creamos el modelo de la base de datos
const provider = new Schema({
    Cif: String,
    Direction: String,
    email: String,
    name: String,
    product: String,
    amount: Number,
    price: Number,
    
})

//exportamos la base de datos
module.exports = mongoose.model('provider', provider)