
  var mongoose = require("mongoose");
  var Message = require("./message");

  var eventSchema = new mongoose.Schema({
    name: String,
    venue: {
      name: String,
      Latitude: Number,
      Longitude: Number
    },
    startDateTime: Date,
    endDateTime: Date,
    description: String,
    lineUpId: String
  });

  eventSchema.methods.getChatRoom = function(io, user, penName){
    var chatroom = this.id;
    var eventObject = this;
    console.log("the chatroom for the event is: " + chatroom);
    console.log("type of io inside Event model is: " + io);
    io.on("connection", function (socket) {
      socket.join(chatroom);
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
    });
  }

module.exports = mongoose.model("Event", eventSchema);
  // return mongoose.model("Event", eventSchema);

