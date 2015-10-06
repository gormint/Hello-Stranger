var Event = require("../models/event");
var User = require("../models/user");

function create(req, res){
  console.log(req.session);
  var user = User.findById(req.session.passport.id);
  Event.findOne({lineUpId: req.body.lineUpId}, function(err, event){
    if (err) console.log(err);
    if (event) {
      event.getChatRoom()
    }
  })

}

module.exports = {
  create: create
}