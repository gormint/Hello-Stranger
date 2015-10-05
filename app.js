var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var logger = require('morgan');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');


// DB setup
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/helloStranger')

// App Setup
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false} ))
app.use(bodyParser.json())

// views setup/engine etc.
app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.set('views', './views');

// Routes
var routes = require('./config/routes');
app.use(routes);

app.listen(port, function() {
  console.log('Server started listening on port ', port);
});