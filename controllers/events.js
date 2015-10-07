module.exports = function(io){
  var Event = require("../models/event");
  var User = require("../models/user");

  function create(req, res){
    console.log("the user id within the passport is: " + req.session.passport.user);
    console.log(req);
    console.log(req.body);

    var eventData = {
      title: req.body.title,
      lineupId: req.body.lineupId,
      description: req.body.description,
      startDate: startDate,
      venue: {
        name: req.body.venueName,
        latitude: venueLatitude,
        longitude: venueLongitude
      }
    }

    User.findById(req.session.passport.user, function(err, user){
      if (err) console.log(err);
      // penName = user.getPenName();
      var penName = user.id;
      Event.findOne({lineUpId: eventLineUpId}, function(err, event){
        if (err) console.log(err);
        console.log(user);
        if (event) {
          user.joinEvent(event);
          console.log("event already exists in DB");
          console.log(user.events);
          event.getChatRoom(io, user, penName);
        } else {
          newEvent = new Event(eventData);
          newEvent.save(function(err, newEvent){
            if (err) console.log(err);
            console.log("event being created in DB");
            console.log(user);
            user.joinEvent(event);
            console.log(user.events);
            newEvent.getChatRoom(io, user, penName);
          })
        }
      })
    });
    
    res.send("chat til you drop!");
  }
  return {create: create};
}