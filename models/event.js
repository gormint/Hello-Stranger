var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
  name: String,
  venue: {
    name: String,
    Latitude: Number,
    Longitude: Number
  }
  startDateTime: Date,
  endDateTime: Date,
  description: String
});

var Event = mongoose.model("Event", eventSchema);

module.exports = Event;