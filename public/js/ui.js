$(document).ready(function () {

  $('.sidenav').sidenav();
  $('.tooltipped').tooltip();

  var current_page = window.location.href;

  var position = current_page.search("/me");
  if (position != -1) {
    var text = '<span class="green-text text-darken-1"><b>Welcome to RemoteHealth <i class="material-icons">add_alert</i></b></span>';
    M.toast({ html: text });
  }

 

});











//Pin Location
function getLocation() {
  document.getElementById('loader-wrapper2').style.display = 'block';
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    var text = '<span>ERROR: Check Internet Connection!</span>';
    M.toast({ html: text });
  }//end else
}//end getLocation()

function showPosition(position) {
  document.getElementById("latitude").disabled = false;
  document.getElementById("longitude").disabled = false;
  document.getElementById("latitude").value = position.coords.latitude;
  document.getElementById("longitude").value = position.coords.longitude;
  var text = '<span>SUCCESS: Location Pinned Successfully!</span>';
  M.toast({ html: text });
  $(".loader-wrapper2").fadeOut("slow");
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
  $(".loader-wrapper2").fadeOut("slow");
}//end showError()
