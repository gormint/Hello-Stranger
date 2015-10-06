var express = require('express');
var app = express();
var server       = require('http').createServer(app);
var port = process.env.PORT || 3000;

var passport     = require('passport');
var logger = require('morgan');

var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');

var flash        = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// DB setup
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/helloStranger')

// App Setup
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false} ))
app.use(bodyParser.json())


// views setup/engine etc.
app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.set('views', './views');

//sessions
app.use(session({ secret: 'chairman-Yao-and-the-culture-revolutionists' }));

// passport.initialize() middleware is required to initialize Passport. 
app.use(passport.initialize());

// If your application uses persistent login sessions, 
// passport.session() middleware must also be used.
app.use(passport.session()); 
app.use(flash()); 

require('./config/passport')(passport);

app.use(function(req, res, next) {
  global.user = req.user;
  next();
});


// Routes
var routes = require('./config/routes');
app.use(routes);

// Websocket
var io = require('socket.io')(server);

// websocket connection
io.on('connect', function(socket) {
  console.log('Someone has connected!');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    // If there is a message from input form
    if(msg != "") {
      var msg = msg;
      io.emit('chat message', msg);
      console.log("message emited = msg");   
      //line = new Chat({
      //  chatLine: msg
      //})
      //// Save a line-message to DB
      //line.save(function(err, chat) {
      //  if (err) console.log(err);
      //  console.log('Line Saved!');
      //})
    }
  });
})


server.listen(port, function() {
  console.log('Server started listening on port ', port);
});



