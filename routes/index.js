var express = require('express');
var router = express.Router();
const passport = require('passport')
const async = require('hbs/lib/async');

//requerimos la base de datos
const base = require('../models/base')
const users = require('../models/user')
const foro = require('../models/foro')
const sales = require('../models/sales')
const provider = require('../models/provider')

//funciones




/* GET home page. */

router.get('/' , async (req, res, next) => {
  res.render('home')
})
router.get('/About', (req, res, next) => {
  res.render('about');
});
router.get('/Sing-in', function(req, res, next) {
  res.render('login');
});
router.get('/Register', function(req, res, next) {
  res.render('register');
});


router.get('/Managment',isAuthenticated, async function(req, res, next) {

  //session
  const UsuarioLog = req.session.user = 'Pablo'
  console.log(req.session)


  //numero de ventas totales
  const nSales = await sales.count()

  //datos de las todas las ventas
  const Sales = await sales.find()
  ListLimitSales = []
  for (let index = 0; index <= 6; index++) {
    LimitSales = Sales[index]
    ListLimitSales.push(LimitSales)
    //console.log(ListLimitSales)
    
  }
  
  //numero de ventas Offline
  const Offline = await sales.find({Customertype:'Offline'}).count()

  //numero de ventas Online
  const Online = await sales.find({Customertype:'Online'}).count()

  //nuevos compradores
  const New = await sales.find({NewBuyer:'Yes'}).count()

  //ventas totales
  let sumProduct = 0
  for (let index = 0; index < Sales.length; index++) {
    //console.log(Sales[index].Price)
    PriceProduct = Sales[index].Price
    sumProduct = sumProduct + PriceProduct 
  }

  //Gastos totales
  const Provider = await provider.find()
  let sumExpenses = 0
  for (let index = 0; index < Provider.length; index++) {
    //console.log(Sales[index].Price)
    PriceProvider = Provider[index].price
    sumExpenses = sumExpenses + PriceProvider
  }

  //veneficios totales
  TotalBenefits = sumProduct - sumExpenses
  res.render('managment', {ListLimitSales, nSales, Offline, Online, New, sumProduct, sumExpenses, TotalBenefits, UsuarioLog} );
});



router.get('/Foro',isAuthenticated, async function(req, res, next) {
  const noticias = await foro.find()
  console.log(noticias)
  res.render('foro', {noticias});
});
router.get('/Graficos',isAuthenticated, function(req, res, next) {
  res.render('graficos');
});
router.get('/Mapa',isAuthenticated, function(req, res, next) {
  res.render('mapa');
});
router.get('/Gestor-Empleados',isAuthenticated, async function(req, res, next) {
  const Empleados = await base.find()
  res.render('empleados', {Empleados} );
});
router.get('/Proveedoras',isAuthenticated, async function(req, res, next) {
  const proveedores = await provider.find()
  //console.log(proveedores)
  res.render('proveedores', {proveedores} );
});
router.get('/Ventas',isAuthenticated, async function(req, res, next) {
  const ventas = await sales.find()
  res.render('ventas', {ventas} );
});
router.get('/Ajustes',isAuthenticated, function(req, res, next) {
  res.render('ajustes');
});




router.post('/AnadirEmpleado',isAuthenticated, async (req, res, next) => {
  //console.log(req.body)
  const añadirEmpleado = new base(req.body); //body es la informacion que tiene el navegador
  await añadirEmpleado.save();
  //res.json(producto)
  res.redirect('/Gestor-Empleados')
  //res.json({ status: 'Task Saved' })
});

router.delete('/EliminarEmpleado/:id',isAuthenticated, async (req, res) => {
  await base.findByIdAndDelete(req.params.id)
  res.redirect('/Gestor-Empleados')
})

router.get('/EditarEmpleado/:id',isAuthenticated, async (req, res, next) => {
  const EditarEmpleado = await base.findById(req.params.id)
  const Empleados = await base.find()
  res.render('editarempleado', {Empleados, EditarEmpleado})
})
router.put('/EmpleadoEditado/:id',isAuthenticated, async (req, res, next) => {
  //console.log('hola')
  await base.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/Gestor-Empleados')
})







//Funciones ventas
router.post('/AnadirVenta',isAuthenticated, async (req, res, next) => {
  //console.log(req.body)
  const añadirVenta = new sales(req.body); //body es la informacion que tiene el navegador
  await añadirVenta.save();
  //res.json(producto)
  res.redirect('/Ventas')
  //res.json({ status: 'Task Saved' })
});

router.delete('/EliminarVenta/:id',isAuthenticated, async (req, res) => {
  await sales.findByIdAndDelete(req.params.id)
  res.redirect('/Ventas')
})

router.get('/EditarVenta/:id',isAuthenticated, async (req, res, next) => {
  const EditarVenta = await sales.findById(req.params.id)
  const Venta = await sales.find()
  res.render('editarventa', {Venta, EditarVenta})
})
router.put('/VentaEditado/:id',isAuthenticated, async (req, res, next) => {
  //console.log('hola')
  await sales.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/Ventas')
})





//Funciones proveedoras
router.post('/AnadirProveedor',isAuthenticated, async (req, res, next) => {
  //console.log(req.body)
  const añadirProveedor = new provider(req.body); //body es la informacion que tiene el navegador
  await añadirProveedor.save();
  //res.json(producto)
  res.redirect('/Proveedoras')
  //res.json({ status: 'Task Saved' })
});

router.delete('/EliminarProveedor/:id',isAuthenticated, async (req, res) => {
  await provider.findByIdAndDelete(req.params.id)
  res.redirect('/Proveedoras')
})

router.get('/EditarProveedor/:id',isAuthenticated, async (req, res, next) => {
  const EditarProveedor = await provider.findById(req.params.id)
  const Proveedores = await provider.find()
  res.render('editarproveedoras', {Proveedores, EditarProveedor})
})
router.put('/ProveedorEditado/:id',isAuthenticated, async (req, res, next) => {
  //console.log('hola')
  await provider.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/Proveedoras')
})







//Registrarse
router.get('/AnadirUsuario',(req, res, next) => {
  res.render('login')
})
router.post('/AnadirUsuario', passport.authenticate('register', {
  successRedirect: '/Sing-in',
  failureRedirect: '/Register',
  passReqToCallback: true
}))



//Iniciar sesión

router.post('/Sing-in', passport.authenticate('login', {
  successRedirect: '/Managment',
  failureRedirect: '/Sing-in',
  passReqToCallback: true
}))

//cerrar sesion
router.get('/Log-out',isAuthenticated,(req, res, next) => {
  req.logout()
  res.redirect('/')
})

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/Sing-in')
}

router.get('*' , (req, res, next) => {
  res.render('404')
})

module.exports = router;
