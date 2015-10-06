module.exports = function(io){
  var Event = require("../models/event");
  var User = require("../models/user");

  function create(req, res){
    console.log(req.session.passport.user);
    console.log(req.body);

    var eventName = req.body.name;
    var eventLineUpId = req.body.lineUpId;

    User.findById(req.session.passport.user, function(err, user){
      if (err) console.log(err);
      // penName = user.getPenName();
      var penName = "redMonkey";
      Event.findOne({lineUpId: eventLineUpId}, function(err, event){
        if (err) console.log(err);
        console.log(user);
        if (event) {
          user.events.push(event);
          event.getChatRoom(io, user, penName);
        } else {
          newEvent = new Event({
            name: eventName,
            lineUpId: eventLineUpId
          })
          newEvent.save(function(err, newEvent){
            if (err) console.log(err);
            console.log(user);
            user.events.push(newEvent);
            newEvent.getChatRoom(io, user, penName);
          })
        }
      })
    });
    
    res.send("chat til you drop!");
  }
  return {create: create};
}