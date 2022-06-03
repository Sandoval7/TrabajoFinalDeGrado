//Modelos de las bases de datos
const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcryptjs') //npm install bcryptjs

//creamos el modelo de la base de datos
const users = new Schema({
    nombre: String,
    correo: String,
    password: String,
})

users.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}


users.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

//exportamos la base de datos
module.exports = mongoose.model('users', users)