var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  local: {
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
  },
  events: [{type: mongoose.Schema.ObjectId, ref: "Event"}]
});

userSchema.methods.encrypt = function(password){
  return bcrypt.hash(password, bcrypt.genSalt(), null);
}

userSchema.methods.validPassword = function(password){
  return bcrypt.compare(password, this.local.password);
}

var User = mongoose.model("User", userSchema);

module.exports = User;