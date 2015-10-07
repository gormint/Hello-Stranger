var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/helloStranger')

var Event = require("./event");
var User = require("./user");

// mongoose.connection.db.dropDatabase();

// var event1 = new Event({
//   name: "TestEvent",
//   description: "something something darkside"
// });

// event1.save(function(err, event){
//   if (err) console.log(err);
//   console.log(event.id + "has been created");
// })

Event.find({_id: "561530029d41ac12bdcd6ff7"}, function(err, event){
  console.log("this is the event: " + event);

  User.find({ _id: "56152ff99d41ac12bdcd6ff6", events : { $in: event }}, function(err, user){
    console.log(user);
  })
})

