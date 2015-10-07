var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');
var _ = require('underscore');

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
  var currentUser = this;
  console.log("event id is: " + event.id);
  console.log("currentUser is: " + currentUser.id);
  var events = this.events;
  var hasEvent = false
  for (i=0; i< events.length; i++) {
    if (events[i].toString() === event.id ) {
      hasEvent = true;
      break;
    }
  }
  console.log(hasEvent);
  if (hasEvent) {
    console.log("event attended by user");
  } else {
    currentUser.events.push(event);
    currentUser.save(function(err, user){
      if (err) console.log('error!' + err);
      console.log("event pushed into user");
    })
  }
}

var User = mongoose.model("User", userSchema);

module.exports = User;