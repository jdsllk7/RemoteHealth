const med_data = document.querySelector('.med_data');
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

  $('.loader-wrapper-pre').fadeOut();
});




// Add medical data
const renderMed_id = (data, id) => {
  if (med_data) {
    var html = ``;

    console.log(data.review_state);
    if (data.review_state == true) {
      if (data.priority === 'critical') {
        html = `
      <li class="medical_data" data-id="${id}">
      <div class="collapsible-header black-text">
        <i class="material-icons">person</i>${data.patient_name}
        <span class="new badge red" data-badge-caption="${data.priority}"></span>
      </div>
      <div class="collapsible-body">
        <span class="white-text">
          <form action="/map" method="GET" class="locate_btn" onsubmit="document.getElementById('loader-wrapper2').style.display = 'block'; getLocation();">
            <input type="hidden" name="lat" value="${data.coordinates.latitude}" />
            <input type="hidden" name="long" value="${data.coordinates.longitude}" />
            <input type="hidden" name="name" value="${data.patient_name}" />
            <button type="submit" class="btn-floating btn-small waves-effect
              waves-light green darken-3 white-text">
              <i class="material-icons">room</i>
            </button>
          </form>
          <h6><b>RESPONSE TIME:</b></h6>
          <span><b>Submitted On:</b> ${data.date}</span><br>
          <span><b>Reviewed:</b> ${timeSince(new Date(Date.now()))}</span><br>
          <br><hr><br>
          <h6><b>PATIENT'S INFO:</b></h6>
          <span><b>Age:</b> ${data.patient_age} ${data.ageType}</span><br>
          <span><b>Sex:</b> ${data.sex}</span><br>
          <span><b>Temperature:</b> ${data.patient_temp}</span><br>
          <span><b>Blood Pressure:</b> ${data.patient_bp}</span><br>
          <span><b>Weight:</b> ${data.patient_weight}</span><br>
          <br><hr><br>
          <h6><b>DIAGNOSIS:</b></h6>
          <span><b>&#9830; </b>${data.diagnosis}</span><br>
          <br><hr><br>
          <h6><b>MEDICAL PRESCRIPTION:</b></h6>
          <span><b>&#9830; </b>${data.prescription1}</span><br>
          <span><b>&#9830; </b>${data.prescription2}</span><br>
          <span><b>&#9830; </b>${data.prescription3}</span><br>
          <br><hr><br>
          <h6><b>EXTRA INFO:</b></h6>
          <span><b>&#9830; </b>${data.extra_doctor_info}</span><br>
        </span>
        <br>
        <a data-id="${id}" class="btn waves-effect waves-light green darken-3 btn-small
          white-text"><i class="material-icons right">open_in_new</i>Finish</a>
      </div>
    </li>
  `;
      } else {
        html = `
      <li class="medical_data" data-id="${id}">
      <div class="collapsible-header black-text">
        <i class="material-icons">person</i>${data.patient_name}
      </div>
      <div class="collapsible-body">
        <span class="white-text">
          <form action="/map" method="GET" class="locate_btn" onsubmit="document.getElementById('loader-wrapper2').style.display = 'block'; getLocation();">
            <input type="hidden" name="lat" value="${data.coordinates.latitude}" />
            <input type="hidden" name="long" value="${data.coordinates.longitude}" />
            <input type="hidden" name="name" value="${data.patient_name}" />
            <button type="submit" class="btn-floating btn-small waves-effect
              waves-light green darken-3 white-text">
              <i class="material-icons">room</i>
            </button>
          </form>
          <h6><b>RESPONSE TIME:</b></h6>
          <span><b>Submitted On:</b> ${data.date}</span><br>
          <span><b>Reviewed:</b> ${data.review_date}</span><br>
          <br><hr><br>
          <h6><b>PATIENT'S INFO:</b></h6>
          <span><b>Age:</b> ${data.patient_age} ${data.ageType}</span><br>
          <span><b>Sex:</b> ${data.sex}</span><br>
          <span><b>Temperature:</b> ${data.patient_temp}</span><br>
          <span><b>Blood Pressure:</b> ${data.patient_bp}</span><br>
          <span><b>Weight:</b> ${data.patient_weight}</span><br>
          <br><hr><br>
          <h6><b>DIAGNOSIS:</b></h6>
          <span><b>&#9830; </b>${data.diagnosis}</span><br>
          <br><hr><br>
          <h6><b>MEDICAL PRESCRIPTION:</b></h6>
          <span><b>&#9830; </b>${data.prescription1}</span><br>
          <span><b>&#9830; </b>${data.prescription2}</span><br>
          <span><b>&#9830; </b>${data.prescription3}</span><br>
          <br><hr><br>
          <h6><b>EXTRA INFO:</b></h6>
          <span><b>&#9830; </b>${data.extra_doctor_info}</span><br>
        </span>
        <br>
        <a data-id="${id}" class="btn waves-effect waves-light green darken-3 btn-small
          white-text"><i class="material-icons right">open_in_new</i>Finish</a>
      </div>
    </li>
  `;
      }


      med_data.innerHTML += html;
    }
  }
};




//Remove Med Data
const removeMed_id = (id) => {
  const medical_data = document.querySelector(`.medical_data[data-id=${id}]`);
  medical_data.remove();
};








function timeSince(date) {

  console.log(date);

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}



















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