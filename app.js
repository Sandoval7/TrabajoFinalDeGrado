var express = require('express');

//deploy
require('dotenv').config()

//views
const hbs = require('hbs')
const methodOverride = require('method-override') //npm install method-override
var logger = require('morgan');
const mongoose = require('mongoose')
var path = require('path');
const flash = require('connect-flash') // npm install connect-flash
const urlbase = process.env.MONGOOSE


// Requerimos Passport
const passport = require("passport") //npm install passport
const session = require("express-session") //npm install express-session

var app = express();
require('./config/passport')

//base de datos
mongoose.connect(urlbase,{ 
  //mongodb://localhost/productos
  //express --view=hbs
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))



// Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  app.locals.Messageregister = req.flash('Messageregister')
  app.locals.Messagelog = req.flash('Messagelog')
  app.locals.user = req.user
  next()
})

app.use('/', require('./routes/index'));
module.exports = app;
