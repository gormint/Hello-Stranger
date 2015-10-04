var express      = require('express');
var app          = express();
var server       = require('http').createServer(app);
var port         = process.env.PORT || 3000;
var logger       = require('morgan');
var ejsLayouts   = require("express-ejs-layouts");
// Websocket
var io           = require('socket.io')(server);

// websocket connection
io.on('connect', function(sockets) {
  console.log('Someone has connected!');
  sockets.on('chat message', function(msg){
    console.log('message: ' + msg);
    if(msg != "") {
      var msg = msg;
      io.emit('chat message', msg);    
      line = new Chat({
        chatLine: msg
      })
      line.save(function(err, chat) {
        if (err) console.log(err);
        console.log('Line Saved!');
      })
    }
  });
})


// DB setup
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/helloStranger')

// App Setup
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

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