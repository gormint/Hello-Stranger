var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  events: [{type: mongoose.Schema.ObjectId, ref: "Event"}]
});

userSchema.methods.getLocation = function(){
  
}

var User = mongoose.model("User", userSchema);

module.exports = User;