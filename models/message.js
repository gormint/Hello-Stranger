var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
  content: String,
  author: {
    penName: String,
    author_id: {type: mongoose.Schema.ObjectId, ref: "User"}
  },
  event: {type: mongoose.Schema.ObjectId, ref: "Event"}
});

var Message = mongoose.model("Message", messageSchema);

module.exports = Message;