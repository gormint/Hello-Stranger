var mongoose = require("mongoose");
var Message = require("./message");

var eventSchema = new mongoose.Schema({
  title: String,
  venue: {
    name: String,
    Latitude: Number,
    Longitude: Number
  },
  startDate: Date,
  description: String,
  lineupId: String
});

eventSchema.methods.getChatRoom = function(io, user, penName){
  var chatroom = this.id;
  var eventObject = this;
  var connected = false;
  io.on("connection", function (socket) {
    console.log("this is the socket id: " + socket.id);
    console.log("is this socket already connected?" + connected);
    if (!connected) {
      socket.join(chatroom,function(){
        connected = true;
      });

      console.log("join in chatroom: " + chatroom);
      socket.on('chat message', function (message) {
        console.log("received message: " + message);
        var newMessage = new Message({
          content: message.message,
          event: eventObject,
          author: {
            penName: penName,
            author_id: user
          }
        })
        newMessage.save(function(err, msg){
          console.log(msg + "msg has been saved");
        })
        io.to(chatroom).emit("chat message", penName + ": " +message.message);
      });
    }
  });
}

eventSchema.methods.getPastMessages = function (){
  // Message.find({event: this})
}

module.exports = mongoose.model("Event", eventSchema);

