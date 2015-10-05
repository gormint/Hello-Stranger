var request = require("request");


function index(req, res){
  console.log(typeof req.query.latitude);
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;

  //format current date time into YYYY-MM-DD
  var date = new Date()
  var currentDate = String(date.getUTCFullYear()).concat("-", date.getUTCMonth() + 1, "-", date.getUTCDate());

  var lineupUrl = "http://planvine.com/api/v1.7/event/?apiKey="+ process.env.LINEUPNOW_API_KEY + "&lat="+ latitude + "&lng=" + longitude + "&radius=1&startDate=" + currentDate + "&order=date";

  console.log(req.query);
  request(lineupUrl, function(error, response, body){
    console.log("the keys of the body: " + Object.keys(JSON.parse(response.body)));
    console.log(JSON.parse(response.body).data[0].venues);
    events = JSON.parse(response.body).data.filter(isActive);
    res.json(events);
  })
}

// function excludeFutureEvents(events){
//   events.filter(isActive);
// }

function isActive(event){
  console.log("inside isActive function, the type of event is: " + typeof event + "; the keys of event are: " + Object.keys(event));
  var eventStartDate = new Date(event.venues[0].performances[0].startDate);
  console.log("this is the start date: " + eventStartDate);
  var currentDate = new Date();
  var result = ((eventStartDate.getDate() === currentDate.getDate()) && (eventStartDate.getFullYear() === currentDate.getFullYear()) && (eventStartDate.getMonth() === currentDate.getMonth()));
  console.log("the boolean result is: " + result);
  return result;
}

module.exports = {
  index: index
}