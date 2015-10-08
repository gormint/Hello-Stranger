$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(function(position) {
    getEvents(position.coords.latitude, position.coords.longitude);
  })
  // The above function shows the navbar unless you're on one of the lander pages.
  var path = window.location.pathname; // returns path.
  console.log('the path here is ' + path)
  if(path.length > 2 && path != "/signup") {
    $('#menu').slideDown("slow");
  } 


  // this is for clicks from the navbar, it will change page to show attended events list.
  $('body').on("click", ".js-attended-events", function(e){
    e.preventDefault();
    console.log('click!')
    $.ajax({
      url: '/events',
      method: 'GET',
      dataType: "json"
    })
    .done(function(res) {
      console.log(res)
      appendHistoricalEvents(res);
    })   
  })

  $('body').on("submit", "#js-join-chat-form", function(e){
    e.preventDefault();
    e.stopPropagation();
    console.log("join chat clicked");
    var data = $(this).serialize();
    $.ajax({
      url: '/events',
      method: 'post',
      dataType: "json",
      data: data
    })
    .done(function(res) {
      console.log(res)
      showChatRoom(res);
    })
  }) 

  // this is for clicks from list of current events, shows event show-page (map) 
  $('body').on("click", ".js-events-li", function(e){
    var eventid = $(this).data("eventid");

    urlSingleEvent  = "http://planvine.com/api/v1.7/event/" + eventid +"/?apiKey=d95e605e18384209b386773c5468b15e";

    request(urlSingleEvent, "get")
    .done(function(response){
      console.log("from the api:") 
      console.log(response);
      appendEvent(response);
    })
    .fail(function(error){
      console.log("got and error: " + error);
    })
  })
});

