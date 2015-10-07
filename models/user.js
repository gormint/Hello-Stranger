var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  local: {
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
  },
  events: [{type: mongoose.Schema.ObjectId, ref: "Event"}]
});

userSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.joinEvent = function(event){

}

var User = mongoose.model("User", userSchema);

module.exports = User;