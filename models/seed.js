var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/helloStranger')

var Event = require("./event");

// mongoose.connection.db.dropDatabase();

// var event1 = new Event({
//   name: "TestEvent",
//   description: "something something darkside"
// });

// event1.save(function(err, event){
//   if (err) console.log(err);
//   console.log(event.id + "has been created");
// })

Event.find({_id: "5613d1dd2aed8ed295790bb0has"}, function(err, event){
  console.log("this is the event: " + event);
})