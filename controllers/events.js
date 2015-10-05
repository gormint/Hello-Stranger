var request = require("request");


function index(req, res){
  console.log(typeof req.query.latitude);
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  // the viewport amount can be made dynamic, currently the values are for one square mile distance from the centre
  var NELatitude = Number(latitude) + 0.0005;
  var NELongitude = Number(longitude) + 0.01;
  var SWLatitude = Number(latitude) - 0.0005;
  var SWLongitude = Number(longitude) - 0.01;

  //format current date time into YYYY-MM-DDThh:mm:ss
  var date = new Date()
  var currentDateTime = String(date.getUTCFullYear()).concat("-", date.getUTCMonth() + 1, "-", date.getUTCDate(), "T", date.getUTCHours(), ":", date.getUTCMinutes(), ":", date.getUTCSeconds() ) 
  // date.getUTCFullYear();
  // date.getUTCMonth() + 1
  // date.getUTCDate()
  // date.getUTCHours()
  // date.getUTCMinutes()
  // date.getUTCSeconds()

  var url = "https://www.eventbriteapi.com/v3/events/search/?location.latitude=" + latitude +"&location.longitude=" + longitude +"&location.viewport.northeast.latitude=" + NELatitude +"&location.viewport.northeast.longitude=" + NELongitude + "&location.viewport.southwest.latitude="+ SWLatitude + "&location.viewport.southwest.longitude=" + SWLongitude + "&token=" + process.env.EVENTBRITE_PERSONAL_OAUTH_TOKEN

// + "&start_date.range_end=" + currentDateTime 
// &start_date.range_start=2015-10-03T18:00:00Z&start_date.range_end=2015-10-11T04:00:00Z

  console.log(req.query);
  request(url, function(error, response, body){
    console.log("these are the response: " + response);
    console.log("Number of events is: " + response.body);
    res.json(JSON.parse(response.body));
  })

}

module.exports = {
  index: index
}