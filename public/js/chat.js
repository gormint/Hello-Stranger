$(document).ready (function () {
  console.log("Document chat.js ready!")

  var actualUser = "John said ";

  var socket = io(); //call to localhost
  // In case we would like to use nGrok
  //var socket = io('http://623fba18.ngrok.io');

  // Switching on windowsocket
  socket.on('connect', function(){
    console.log('client connected to sockets');
  });

  // Listening to the form that send messages from user 
  $('form').submit(function(){
    console.log('click form');
    socket.emit('chat message', actualUser + $('#message-from-form').val());
    msg = $('#message-from-form').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    console.log(msg);
    $('#chat-div-ul').append($('<li class="chat-div-li">').text(msg));
    var $elem = $('#messages');
    console.log('click');
    $('#chat-div').animate({scrollTop: $elem.height()}, 800);
  });

  // Scroll auto of messages
  var $elem = $('#messages');
  $('#chat-div').animate({scrollTop: $elem.height()}, 2500);
  // Buttons to scroll
  $('#nav_up').on('click', function(event){
    var $elem = $('#messages');
    console.log('click');
    $('#chat-div').animate({scrollTop: '0px'}, 800);
  });
  $('#nav_down').on('click', function(event){
    var $elem = $('#messages');
    console.log('click');
    $('#chat-div').animate({scrollTop: $elem.height()}, 800);
  });






})
















