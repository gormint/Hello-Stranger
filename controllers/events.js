var request = require("request");


function index(req, res){
  console.log(typeof req.query.latitude);
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;

  //format current date time into YYYY-MM-DD
  var date = new Date()
  var currentDate = String(date.getUTCFullYear()).concat("-", date.getUTCMonth() + 1, "-", date.getUTCDate());

  var lineupUrl = "http://planvine.com/api/v1.7/event/?apiKey="+ process.env.LINEUPNOW_API_KEY + "&lat="+ latitude + "&lng=" + longitude + "&radius=1&startDate=" + currentDate + "&order=date";

  request(lineupUrl, function(error, response, body){
    events = JSON.parse(response.body).data.filter(isActive);
    res.json(events);
  })
}

function isActive(event){
  var eventStartDate = new Date(event.venues[0].performances[0].startDate);
  var currentDate = new Date();

  return (eventStartDate.getDate() === currentDate.getDate()) && (eventStartDate.getFullYear() === currentDate.getFullYear()) && (eventStartDate.getMonth() === currentDate.getMonth());
}

module.exports = {
  index: index
}