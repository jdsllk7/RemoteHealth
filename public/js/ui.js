$(document).ready(function () {

  $('.sidenav').sidenav();
  $('.tooltipped').tooltip();
  $('select').formSelect();
  $('.collapsible').collapsible();
  var elem = document.querySelector('.collapsible.expandable');
  var instance = M.Collapsible.init(elem, {
    accordion: false
  });
  $('input#input_text, textarea#textarea1').characterCounter();

  var current_page = window.location.href;

  var position = current_page.search("notFound");
  if (position != -1) {
    var text = '<span class="white-text text-darken-1"><b>Medical ID Not Found <i class="material-icons">error_outline</i></b></span>';
    M.toast({ html: text });
  }

});



const renderMed_id = (data) => {
  
};


























//Pin Location
function getLocation() {
  document.getElementById('loader-wrapper').style.display = 'block';
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    var text = '<span>ERROR: Check Internet Connection!</span>';
    M.toast({ html: text });
  }//end else
}//end getLocation()

var lat, long;
function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  var text = '<span class="green-text text-lighten-3"><b>SUCCESS:</b> Location Pinned Successfully! <i class="material-icons">check_box</i></span>';
  M.toast({ html: text });
  $(".loader-wrapper").fadeOut("slow");
}//end showPosition()

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      var text = '<span>ERROR: User denied the request for Geolocation!</span>';
      M.toast({ html: text });
      break;
    case error.POSITION_UNAVAILABLE:
      var text = '<span>ERROR: Location information is unavailable<br>Check Internet Connection!</span>';
      M.toast({ html: text });
      break;
    case error.TIMEOUT:
      var text = '<span>ERROR: The request to get user location timed out!</span>';
      M.toast({ html: text });
      break;
    case error.UNKNOWN_ERROR:
      var text = '<span>ERROR: An unknown error occurred!</span>';
      M.toast({ html: text });
      break;
  }
  $(".loader-wrapper").fadeOut("slow");
}//end showError()