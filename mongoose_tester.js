var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/helloStranger');
var User = require('./models/user');
var Event = require('./models/event');
var Message = require('./models/message');

getPacoEvents = function(){
  User.findOne({'email':'pacocontrerasdct@gmail.com'}).populate("events").exec(function(err, user){
    if (err) console.log(err);
    // console.log(user.events)
      for (var i = user.events.length - 1; i >= 0; i--) {
        console.log(user.events[i]._id)
      };
    });
}