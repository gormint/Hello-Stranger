var mongoose = require("mongoose");
var Message = require("./message");
var io = require("socket.io")

var eventSchema = new mongoose.Schema({
  name: String,
  venue: {
    name: String,
    Latitude: Number,
    Longitude: Number
  },
  startDateTime: Date,
  endDateTime: Date,
  description: String
});

eventSchema.methods.getChatRoom = function(io){
  var chatroom = this.id;
  var eventObject = this;
  console.log("the chatroom for the event is: " + chatroom);
  io.on("connection", function (socket) {
    socket.join(chatroom);
    console.log("join in chatroom: " + chatroom);
    socket.on('chat message', function (message) {
      console.log("received message: " + message);
      var newMessage = new Message({
        content: message.message,
        event: eventObject,
        author: {penName: message.penName}
      })
      newMessage.save(function(err, msg){
        console.log(msg + "msg has been saved");
      })
      io.to(chatroom).emit("chat message", message.penName + ": " +message.message);
    });
  });
}

var Event = mongoose.model("Event", eventSchema);

module.exports.io = io;
module.exports.Event = Event;
