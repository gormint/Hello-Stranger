var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/helloStranger');

var Event = require('./event');
var User = require('./user');
var Message = require('./message');

// mongoose.connection.db.dropDatabase();

// USERS ================================================
var user1 = new User({
  name: 'Yaobot',
  email: 'opal_obsidian@hotmail.com',
  events: []
});
user1.save(function(err, user){
  if (err) console.log(err);
  console.log(user.name + " created");
});
var user2 = new User({
  name: 'Paco',
  email: 'pacocontrerasdct@gmail.com',
  events: []
});
user2.save(function(err, user){
  if (err) console.log(err);
  console.log(user.name + " created");
});
var user3 = new User({
  name: 'Jimmy',
  email: 'cyberyt@gmail.com',
  events: []
});
user3.save(function(err, user){
  if (err) console.log(err);
  console.log(user.name + " created");
});

// EVENTS ================================================
var event1 = new Event({
  title: 'Dressed To Impress Fashion Show',
  endDate: new Date,
  startDate: new Date,
  website: 'www.someURL.com',
  venue: {
    name: 'Bangla City',
    address: '86 Brick Ln, London E1 6RL',
    Latitude: 51.519601,
    Longitude: -0.071746
  }
});
event1.save(function(err, event){
  if (err) console.log(err);
  console.log(event.title + " created");

  user1.events.push(event1);
  user1.save(function(err, user){
  if (err) console.log(err);
  console.log(user.name + " updated with event")});
  
  user2.events.push(event1)
  user2.save(function(err, user){
  if (err) console.log(err);
  console.log(user.name + " updated with event")});
});

var event2 = new Event({
  title: 'Nightmares On Wax',
  endDate: new Date,
  startDate: new Date,
  website: 'www.someURL.com',
  venue: {
    name: 'Second Home',
    address: '65 Hanbury St. London, E1 5JP',
    Latitude: 51.520322,
    Longitude: -0.070383
  }
});
event2.save(function(err, event){
  if (err) console.log(err);
  console.log(event.title + " created");

  user2.events.push(event2)
  user2.save(function(err, user){
  if (err) console.log(err);
  console.log(user.name + " updated with event")});

  user3.events.push(event2)
  user3.save(function(err, user){
  if (err) console.log(err);
  console.log(user.name + " updated with event")});
});

var event3 = new Event({
  title: 'World Vinyl Day Celebration',
  endDate: new Date,
  startDate: new Date,
  website: 'www.someURL.com',
  venue: {
    name: 'Rough Trade East',
    address: '65 Hanbury St. London, E1 5JP',
    Latitude: 51.521130,
    Longitude: -0.072175
  }
});
event3.save(function(err, event){
  if (err) console.log(err);
  console.log(event.title + " created");
  user3.events.push(event3)
  user3.save(function(err, user){
  if (err) console.log(err);
  console.log(user.name + " updated with event")});
  user1.events.push(event3)
  user1.save(function(err, user){
  if (err) console.log(err);
  console.log(user.name + " updated with event")});
});

// MESSAGES ==============================================

var message1 = new Message({
  content: 'Man Mongoose is annoying',
  author: {
    author_id: user2,
    penName: 'Red Tractor',
  },
  event: event3
});
message1.save(function(err, message){
  if (err) console.log(err);
});


