function showChatRoom(chatRoomDetails){
  $("#historical-list-events-ul").empty();
  $("#list-event").empty();
  $("#map").addClass('hide').empty();

  var messages = chatRoomDetails.messages;
  var chatRoomData = {
    title: chatRoomDetails.title,
    imageUrl: chatRoomDetails.imageUrl
  }
  var containerTemplate = $("#chat-container-template").html();
  Mustache.parse(containerTemplate);
  var renderedContainer = Mustache.render(containerTemplate, chatRoomData);
  $("#chat-room").append(renderedContainer);

  $.each(messages, function(index, message){
    var messageData = {
      date: message.createdAt.toLocaleString(),
      content: message.content,
      author: message.author.penName
    }
    var template = $("#chat-room-template").html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, messageData);
    $("#chat-div-ul").append(rendered);
  })
}

function getEvents(latitude, longitude){
  //format current date time into YYYY-MM-DD
  console.log("we are getting events");
  var date = new Date();
  var currentDate = String(date.getUTCFullYear()).concat("-", date.getUTCMonth() + 1, "-", date.getUTCDate());
  // console.log("lat: " + latitude + "long: " + longitude);
  var lineupUrl = "http://planvine.com/api/v1.7/event?apiKey=d95e605e18384209b386773c5468b15e&lat="+ latitude + "&lng=" + longitude + "&radius=1&startDate=" + currentDate + "&order=date&callback=callbackFunction";
  console.log(lineupUrl);
  request(lineupUrl, "get");
}
// See above! 
function callbackFunction(object) {
  console.log("being called back");
  events = object.data.filter(isActive);
  console.log(events);
  appendEvents(events);
}

function isActive(event){
  var eventStartDate = new Date(event.venues[0].performances[0].startDate);
  var currentDate = new Date();

  return (eventStartDate.getDate() === currentDate.getDate()) && (eventStartDate.getFullYear() === currentDate.getFullYear()) && (eventStartDate.getMonth() === currentDate.getMonth());
}

function appendHistoricalEvents(attendedEvents){
  console.log("you're in appendHistoricalEvents()")
  $("#historical-list-events-ul").empty();
  $("#list-event").empty();
  $("#map").addClass('hide').empty();
  $("#chat-room").empty();

  $.each(attendedEvents, function(index, eventData){
    // console.log(eventData);
    var eventDetails = {
      title: eventData.attendedEvent.title,
      name: eventData.attendedEvent.venue.name,
      startDate: eventData.attendedEvent.startDate,
      eventObjectId: eventData.attendedEvent._id
    }
    $('#list-events-ul').html('') // clears list data
    var template = $("#historical-list-template").html();
    Mustache.parse(template);
    console.log(template);
    var rendered = Mustache.render(template, eventDetails);
    $("#historical-list-events-ul").append(rendered);
  })
}

function appendEvents(events){
  navigator.geolocation.getCurrentPosition(function(position){
    $.each(events, function(index, eventData){
      var distance = calculateDistance(position.coords.latitude, position.coords.longitude, eventData.venues[0].lat, eventData.venues[0].lng, 'M');
      var eventDetails = {
        title: eventData.title,
        eventid: eventData.id,
        address: eventData.venues[0].address,
        distance: Math.round(distance)
      }
      var template = $("#list-template").html();
      Mustache.parse(template);
      console.log("we are using mustache");
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
    if (unit=="M") { distance = distance * 1609.344 };
    return distance;
}

function appendEvent(response) {
  var eventData = response.data;
  var eventLat = eventData.venues[0].lat;
  var eventLng = eventData.venues[0].lng;
  $('#list-events-ul').html('') // clears list data
  var eventDetails = {
    title: eventData.title,
    description: eventData.description.replace(/(<([^>]+)>)/ig,""),   // Was apiClean = $('#single-event:first').text();
    venueName: eventData.venues[0].name,
    venueLatitude: eventLat,
    venueLongitude: eventLng,
    startDate: eventData.venues[0].performances[0].startDate,
    lineupId: eventData.id,
    imageUrl: eventData.image.highResolution.url
  }

  var singleTemplate = $("#single-template").html();
  Mustache.parse(singleTemplate);
  var rend = Mustache.render(singleTemplate, eventDetails);
  $("#list-event").append(rend);

  $('#map').removeClass('hide');
  initMap(eventLat, eventLng);
}


function initMap(eventLat, eventLng) {
  var browserSupportFlag = new Boolean(); 
  var myOptions = {
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: mapStyling
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
      var eventLocation = new google.maps.LatLng(eventLat, eventLng);
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

var mapStyling = [{"featureType":"all","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"all","elementType":"geometry","stylers":[{"visibility":"on"},{"saturation":"9"},{"weight":"0.75"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#00ff35"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"simplified"},{"color":"#728790"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#531c1c"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#9b3232"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#f4eeee"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#aeabab"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f3f4f4"},{"visibility":"simplified"},{"lightness":"2"},{"gamma":"1.78"},{"weight":"1.43"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"off"},{"color":"#8d3e3e"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#656e6e"}]},{"featureType":"landscape","elementType":"labels.text.stroke","stylers":[{"hue":"#ff0000"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"},{"color":"#f8d7d7"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#f5fbf6"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"visibility":"off"},{"color":"#b25e5e"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"visibility":"off"},{"color":"#ff0000"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"on"},{"color":"#bcb7b1"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b1cdb0"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#6ccce5"},{"visibility":"on"}]}]