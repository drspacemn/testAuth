
// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var ejs = require('ejs');
var session = require('express-session');

var authController = require('./controllers/auth');
var deviceController = require('./controllers/device');
var userController = require('./controllers/user');
var clientController = require('./controllers/client');
var oauth2Controller = require('./controllers/oauth2');

mongoose.connect('mongodb://localhost:27017/app')

// Create our Express application
var app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({
    secret: 'layerthree',
    saveUninitialized: true,
    resave: true
}))

app.use(passport.initialize())

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

router.route('/users')
    .post(authController.isAuthenticated, userController.postUsers)
    .get(authController.isAuthenticated,userController.getUsers)

router.route('/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients)

router.route('/oauth2/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)
    .post(authController.isAuthenticated, oauth2Controller.decision)

router.route('/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token)

router.route('/device')
    .post(authController.isAuthenticated, deviceController.postDevice)
    .get(authController.isAuthenticated, deviceController.getDevices)

router.route('/devices/:device_id')
    .get(authController.isAuthenticated, deviceController.getDevice)

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
