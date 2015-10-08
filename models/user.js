var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');
var generateName = require('sillyname');

var userSchema = new mongoose.Schema({
  local: {
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true}
  },
  events: [{
    attendedEvent: {type: mongoose.Schema.ObjectId, ref: "Event"},
    penName: String
  }]
});

// userSchema.methods.attendedEvents = function(callback) {
//   // var currentUser = this;
//   var promise = User.findOne(this.id).populate('events.attendedEvent').exec(function(err, user) {
//     console.log('attendedEvents: this is user:')
//     console.log(user)
//     return user.events.filter(function(event){
//       console.log('attendedEvents: this is event:')
//       console.log(event)
//       console.log('attendedEvents: this is event.attendedEvent:')
//       console.log(event.attendedEvent)
//       return event.attendedEvent;
//     })
//   })
//   return promise;
// }

userSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.joinEvent = function(event){
  var currentUser = this;
  var events = this.events;
  var hasEvent = 0 // 0 is falsey. Changed this so we have an index for penName.
  for (i=1; i<= events.length; i++) {
    if (events[i-1].attendedEvent.toString() === event.id ) {
      hasEvent = i;
      break;
    }
  }
  console.log(hasEvent);
  if (hasEvent) {
    console.log("event attended by user");
    var penName = currentUser.events[hasEvent-1].penName;
  } else {
    var penName = generateName();
    currentUser.events.push({attendedEvent: event, penName: penName});
    currentUser.save(function(err, user){
      if (err) console.log('error!' + err);
      console.log("event pushed into user");
    })
  }
  return penName;
}

var User = mongoose.model("User", userSchema);

module.exports = User;