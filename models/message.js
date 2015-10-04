var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
  content: String,
  user: [User.Schema],
  channel:
});

var Message = mongoose.model("Message", messageSchema);

module.exports = Message;