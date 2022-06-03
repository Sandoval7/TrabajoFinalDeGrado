// Recursos
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// DB
const users = require('../models/user')


passport.serializeUser((user, done) => {
    done(null, user.id)
})


passport.deserializeUser(async (id, done) => {
    const user = await users.findById(id)
    done(null, user)
})


passport.use('register', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, correo, password, done) => {

    const user = await users.findOne({ correo: correo })
    const username = await users.findOne({ nombre: req.body.nombre })
    if (user) {
        return done(null, false, req.flash('Messageregister', 'The email is already taken'))
    }else if(username) {
        return done(null, false, req.flash('Messageregister', 'User already exists'))
    } else {
        const newUser = new users()
        newUser.nombre = req.body.nombre
        newUser.correo = correo 
        newUser.password = newUser.encryptPassword(password)
        await newUser.save()
        done(null, newUser)
    }

    
}))


passport.use('login', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, correo, password, done) => {

    const user = await users.findOne({ correo: correo })
    if (!user) {
        console.log("hol")
        return done(null, false, req.flash('Messagelog', 'User doesn´t exist'))
    }
    else if (!user.comparePassword(password)) {
        console.log("hola2")
        return done(null, false, req.flash('Messagelog', 'Incorrect password'))
    } else {
        console.log("hola")
        done(null, user)
    }
}))
