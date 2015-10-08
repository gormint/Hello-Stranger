$(document).ready(function() {
  console.log("Document chat.js ready!")

  var socket = io();

  // Switching on windowsocket
  socket.on('connect', function(){
    console.log('client connected to sockets');
  });

  var path = window.location.pathname; // returns path.
  console.log('the path here is ' + path)
  if(path.length > 2 && path != "/signup") {
    $('#nav').slideDown("slow");
  } // The above function shows the navbar unless you're on one of the lander pages.

  // Listening to the form that send messages from user 
  $('#chat-box-form').submit(function(e){
    e.preventDefault();
    console.log('click form');
    
    var valMsg = $('#message-from-form').val();
    console.log('This is message from form: ' + valMsg);

    socket.emit('chat message', {      
      message: $('#message-from-form').val()
    });
    msg = $('#message-from-form').val('');
    return false;
  });

  socket.on('chat message', function(response){
    console.log("This is msg in chat js: " + response.message);
    //Formatting Messages before appending to the page
    $('#chat-div-ul').append($('<span class="chat-penName">').text(response.penName));
    $('#chat-div-ul').append($('<span class="chat-time">').text(response.date));
    $('#chat-div-ul').append($('<br><span class="chat-singleMessage">').text(response.message));
    $('#chat-div-ul').append($('<br>'));

    //var $elem = $('#messages');
    // Getting new line scroll down
    $("#chat-div").animate({
      'scrollTop': $("#chat-div")[0].scrollHeight}, 'slow')
  });

    // Scroll auto of messages
  var $elem = $('#chat-div-ul');
  $('#chat-div').animate({scrollTop: $elem.height()}, 0);
})