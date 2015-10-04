// $(document).ready(function(){
  console.log("all hooked up");
  var map;
  function initMap() {
    console.log("inside initMap");
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  };

// })
