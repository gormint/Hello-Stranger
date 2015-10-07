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

Event.find({_id: "5615431b9a74273741f135cb"}, function(err, event){
  console.log("this is the event: " + event);
  event.getPastMessages();
})

