var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var logger = require('morgan');

// DB setup
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/helloStranger')

// App Setup
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
// views setup/engine etc/
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.set('views', './views');

// Routes
var routes = require('./config/routes');
app.use(routes);

app.listen(port, function() {
  console.log('Server started listening on port ', port);
});