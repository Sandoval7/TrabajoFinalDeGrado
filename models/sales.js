//Modelos de las bases de datos
const mongoose = require('mongoose')
const {Schema} = mongoose

//creamos el modelo de la base de datos
const sales = new Schema({
    NumberTicket: String,
    Product: String,
    Price: Number,
    PaymentType: String,
    Customertype: String,
    NewBuyer: String,
    Status: String

})
//exportamos la base de datos
module.exports = mongoose.model('sales', sales)