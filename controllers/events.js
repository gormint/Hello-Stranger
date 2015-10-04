var request = require("request");


function index(req, res){
  console.log(req.query);
  request("https://www.eventbriteapi.com/v3/events/search/?location.latitude=" + req.query.latitude + "&location.longitude=" + req.query.longitude + "&start_date.range_start=2015-10-03T18:00:00Z&start_date.range_end=2015-10-11T04:00:00Z&token=" + process.env.EVENTBRITE_PERSONAL_OAUTH_TOKEN, function(error, response, body){
    console.log("these are the response: " + response);
    console.log("the body is: " + typeof response.body);
    res.json(JSON.parse(response.body));
  })

}

module.exports = {
  index: index
}