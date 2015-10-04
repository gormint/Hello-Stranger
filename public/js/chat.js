$(document).ready (function () {
  console.log("Document chat.js ready!")

  var socket = io(); //call to localhost
  // In case we would like to use nGrok
  //var sockets = io('http://adfcdf99.ngrok.io');

  // Switching on windowsocket
  sockets.on('connect', function(){
    console.log('client connected to sockets');
  });

  // Listening to the form that send messages from user 
  $('form').submit(function(){
    console.log('click form');
    //sockets.emit('chat message', userPrincipal + $('#m').val());
    //msg = $('#m').val('');
    //return false;
  });







})