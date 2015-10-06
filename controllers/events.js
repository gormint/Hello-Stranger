var Event = require("../models/event");
var User = require("../models/user");

function create(req, res){
  console.log(req.session.passport.user);
  console.log(req.body);
  // var user = User.findById(req.session.passport.id);
  // penName = user.getPenName();
  // Event.findOne({lineUpId: req.body.lineUpId}, function(err, event){
  //   if (err) console.log(err);
  //   if (event) {
  //     event.getChatRoom(io, user, penName)
  //   } else {
  //     newEvent = new Event({
  //       name: req.body.name
  //     })
  //   }
  // })
}

module.exports = {
  create: create
}