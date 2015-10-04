var initialLocation;
var browserSupportFlag =  new Boolean();  

function initMap() {
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
      var locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      request("/events", "get", locationData).done(function(res){
        console.log(res);
        debugger;
      });
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

function request(url, method, data) {
  return $.ajax({
    url: url,
    method: method,
    dataType: "json",
    data: data
  })
}
