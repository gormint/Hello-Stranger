$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(function(position) {
    getEvents(position.coords.latitude, position.coords.longitude)
  })
})

function getEvents(latitude, longitude){
  //format current date time into YYYY-MM-DD
  var date = new Date()
  var currentDate = String(date.getUTCFullYear()).concat("-", date.getUTCMonth() + 1, "-", date.getUTCDate());
  // console.log("lat: " + latitude + "long: " + longitude);
  var lineupUrl = "http://planvine.com/api/v1.7/event?apiKey=d95e605e18384209b386773c5468b15e&lat="+ latitude + "&lng=" + longitude + "&radius=1&startDate=" + currentDate + "&order=date&callback=callbackFunction";
  request(lineupUrl, "get")
}
function callbackFunction(object) {
  events = object.data.filter(isActive);
  // console.log(events);
  appendEvents(events);
}

function isActive(event){
  var eventStartDate = new Date(event.venues[0].performances[0].startDate);
  var currentDate = new Date();

  return (eventStartDate.getDate() === currentDate.getDate()) && (eventStartDate.getFullYear() === currentDate.getFullYear()) && (eventStartDate.getMonth() === currentDate.getMonth());
}

function appendEvents(events){
  navigator.geolocation.getCurrentPosition(function(position){
    $.each(events, function(index, eventData){
      // console.log(eventData);
      var distance = calculateDistance(position.coords.latitude, position.coords.longitude, eventData.venues[0].lat, eventData.venues[0].lng);
      var eventDetails = {
        title: eventData.title,
        eventid: eventData.id,
        address: eventData.venues[0].address,
        distance: distance.toFixed(3)
      }
      var template = $("#list-template").html();
      Mustache.parse(template);
      var rendered = Mustache.render(template, eventDetails);
      $("#list-events-ul").append(rendered);
    })
  })
}

function calculateDistance(userLatitude, userLongitude, eventLatitude, eventLongitude, unit) {
    var radUserLatitude = Math.PI * userLatitude/180;
    var radEventLatitude = Math.PI * eventLatitude/180;
    var radUserLongitude = Math.PI * userLongitude/180;
    var radEventLongitude = Math.PI * eventLongitude/180;
    var theta = userLongitude-eventLongitude;
    var radtheta = Math.PI * theta/180;
    var distance = Math.sin(radUserLatitude) * Math.sin(radEventLatitude) + Math.cos(radUserLatitude) * Math.cos(radEventLatitude) * Math.cos(radtheta);
    distance = Math.acos(distance);
    distance = distance * 180/Math.PI;
    distance = distance * 60 * 1.1515;
    if (unit=="K") { distance = distance * 1.609344 };
    return distance;
}


$('body').on('click', ".events-li", function(event){
  console.log("Click in li list")
  console.log($(this));
  console.log("Click in li list")
  var eventid = $(this).data("eventid");
  console.log(eventid);


  urlSingleEvent  = "http://planvine.com/api/v1.7/event/" + eventid +"/?apiKey=d95e605e18384209b386773c5468b15e";

  request(urlSingleEvent, "get")
  .done(function(response){
    console.log("from the api:" + response);
    appendEvent(response);
  })
  .fail(function(error){
    console.log("got and error: " + error);
  })
})

function appendEvent(response) {
  var apiDesc = response.data.description;
  var eventLat = response.data.venues[0].lat;
  var eventLng = response.data.venues[0].lng;
  $('#list-events-ul').html('') // clears list data
  $('#single-event').append(apiDesc);
  var apiClean = $('#single-event:first').text();
  $('#single-event').html(apiClean);
  $('#map').removeClass('hide');
  console.log('event position lat:' + eventLat)
  console.log('event position lng:' + eventLng)
  initMap(eventLat, eventLng);
}


function initMap(eventLat, eventLng) {
  var browserSupportFlag = new Boolean(); 
  var myOptions = {
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById("map"), myOptions);

  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      directionsDisplay.setMap(map);
      // var marker = new google.maps.Marker({
      //   position: userLocation,
      //   map: map,
      //   title: 'You'
      // })
      var eventLocation = new google.maps.LatLng(eventLat, eventLng);
      // var eventMarker = new google.maps.Marker({
      //   position: eventLocation,
      //   map: map,
      //   title: 'Event'
      // })
      directionsService.route({
        origin: userLocation,
        destination: eventLocation,
        travelMode: google.maps.TravelMode.WALKING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
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
      userLocation = newyork;
    } else {
      alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
      userLocation = siberia;
    }
    map.setCenter(userLocation);
  }
}

function request(url, method, data) {
  return $.ajax({
    url: url,
    method: method,
    dataType: "jsonp",
    data: data
  })
}
