var env = process.env.NODE_ENV || 'development';
var	packageJson	= require('../package.json');
var	path = require('path');
var	express	= require('express');
var	bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var	cookieSession = require('cookie-session');

console.log('Loading app in ' + env + ' mode.');

global.App = {
  app: express(),
  port: process.env.PORT || 3000,
  version: packageJson.version,
  root: path.join(__dirname, '..'),
  appPath: function(path) {
    return this.root + '/' + path
  },
  require: function(path) {
    return require(this.root + '/' + path);
  },
  env: env,
  start: function() {
    if (!this.started) {
      this.started = true;
      this.app.listen(this.port);
      console.log("Running app version " + App.version + " on port " + App.port);
    }
  },
  route: function(path) {
    return this.require("app/controllers/" + path);
  },
  model: function(path) {
    return this.require("app/models/" + path);
  }
}

// views
App.app.set('views', App.appPath("app/views"));
App.app.set('view engine', 'jade');
App.app.set('view options', { pretty: env === 'development'});

// middleware
App.app.use(bodyParser({extended: false})); 								// pull information from html in POST
App.app.use(methodOverride());
App.app.use(cookieParser());
App.app.use(cookieSession({ secret: "verySecret", key: "verySecretKey"}));

App.app.use(express.static(App.appPath('public'))); 	// set the static files location /public/img will be /img for users

// routes
App.require("config/routes")(App.app);

// database
App.require("config/database")(process.env.DATABASE_URL || 'mongodb://localhost/nodemongo');