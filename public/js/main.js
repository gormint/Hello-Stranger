
function initMap() {
  var initialLocation;
  var browserSupportFlag =  new Boolean(); 
  var myOptions = {
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), myOptions);


  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      map.setCenter(initialLocation);
      var marker = new google.maps.Marker({
        position: initialLocation,
        map: map,
        title: 'LOLCAKES'
      })
      getEvents(position.coords.latitude, position.coords.longitude);
      // var locationData = {
      //   latitude: position.coords.latitude,
      //   longitude: position.coords.longitude
      // }
      // request("/events", "get", locationData).done(function(res){
      //   console.log(res);
      //   debugger;
      // });
  //BELOW IS IF THE USER CLICKS NO I DON'T WANT TO SHARE MY LOCATION/FALLBACK (tbh fuck 'em))
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed.");
      initialLocation = newyork;
    } else {
      alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
      initialLocation = siberia;
    }
    map.setCenter(initialLocation);
  }
}

function getEvents(latitude, longitude){
  console.log('getEvents')
  //format current date time into YYYY-MM-DD
  var date = new Date()
  var currentDate = String(date.getUTCFullYear()).concat("-", date.getUTCMonth() + 1, "-", date.getUTCDate());

  var lineupUrl = "http://planvine.com/api/v1.7/event?apiKey=d95e605e18384209b386773c5468b15e&lat="+ latitude + "&lng=" + longitude + "&radius=1&startDate=" + currentDate + "&order=date&callback=callbackFunction";


  request(lineupUrl, "get")
  // .done(function(response){
  //   events = JSON.parse(response.body).data.filter(isActive);
  //   debugger;
  // })
  // .always(function(response) {
  //   console.log('always')
  //   console.log(response)
  // })
}

function callbackFunction(object) {
  events = object.data.filter(isActive);
  console.log(events);
  appendEvents(events);
}

function isActive(event){
  var eventStartDate = new Date(event.venues[0].performances[0].startDate);
  var currentDate = new Date();

  return (eventStartDate.getDate() === currentDate.getDate()) && (eventStartDate.getFullYear() === currentDate.getFullYear()) && (eventStartDate.getMonth() === currentDate.getMonth());
}

function appendEvents(events){
  $.each(events, function(index, eventData){
    console.log(eventData);
    var eventDetails = {
      title: eventData.title,
      slug: eventData.slug,
      address: eventData.venues[0].address,
      distance: eventData.venues[0].lng
    }
    var template = $("#list-template").html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, eventDetails);
    $("#list-events-ul").append(rendered);
  })
}

function request(url, method, data) {
  return $.ajax({
    url: url,
    method: method,
    dataType: "jsonp",
    data: data
  })
}
