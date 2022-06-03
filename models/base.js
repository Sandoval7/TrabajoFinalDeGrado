//Modelos de las bases de datos
const mongoose = require('mongoose')
const {Schema} = mongoose

//creamos el modelo de la base de datos
const employee = new Schema({
    name: String,
    email: String,
    Phone: Number,
    country: String,
    Direction: String,
    DateOfBirth: String,
    SocialSecurityNumber: Number,
    job: String,
    department: String,
    Salary: Number,
    entryDate: String,
})

//exportamos la base de datos
module.exports = mongoose.model('employee', employee)