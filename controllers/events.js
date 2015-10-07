module.exports = function(io){
  var Event = require("../models/event");
  var User = require("../models/user");
  var Message = require("../models/message");

  function create(req, res){
    console.log("the user id within the passport is: " + req.session.passport.user);
    // console.log(req);
    // console.log(req.body);

    eventLineupId = req.body.lineupId;

    var eventData = {
      title: req.body.title,
      lineupId: eventLineupId,
      description: req.body.description,
      startDate: req.body.startDate,
      venue: {
        name: req.body.venueName,
        latitude: Number(req.body.venueLatitude),
        longitude: Number(req.body.venueLongitude)
      }
    }

    User.findById(req.session.passport.user, function(err, user){
      if (err) console.log(err);
      // penName = user.getPenName();
      var penName = user.id;
      Event.findOne({lineupId: eventLineupId}, function(err, event){
        if (err) console.log(err);
        console.log(user);
        if (event) {
          user.joinEvent(event);
          console.log("event already exists in DB");
          console.log(user.events);
          event.getChatRoom(io, user, penName);
          var pastMessages = event.getPastMessages();
          console.log('I am past messages');
          console.log(pastMessages);
        } else {
          newEvent = new Event(eventData);
          newEvent.save(function(err, newEvent){
            if (err) console.log(err);
            console.log("event being created in DB");
            console.log(user);
            user.joinEvent(newEvent);
            console.log(user.events);
            newEvent.getChatRoom(io, user, penName);
          })
        }
        Message.find({event: event}, function(err, messages){
          res.render("chat-room", {messages: messages});
        })
      })
    });
    
    // res.render("chat-room", {messages: messages});
  }

  return {create: create};
}