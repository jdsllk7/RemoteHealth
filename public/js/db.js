if (!db) {
    var text = '<span class="white-text text-darken-1"><b>Bad Internet Connection <i class="material-icons">error_outline</i></b></span>';
    M.toast({ html: text });
}
// enable offline data
db.enablePersistence()
    .catch(function (err) {
        if (err.code == 'failed-precondition') {
            // probably multible tabs open at once
            console.log('persistance failed');
        } else if (err.code == 'unimplemented') {
            // lack of browser support for the feature
            console.log('persistance not available');
        }
    });

// patient_info listener
var data_count = 0;
db.collection('patient_info').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            renderMed_id(change.doc.data(), change.doc.id);
            if (change.doc.data().review_state === true) {
                data_count++;
            }
        }
        if (change.type === 'removed') {
            removeMed_id(change.doc.id);
        }


    });
    document.getElementById('data_count').innerHTML = data_count;
});

// med_ids listener
var temp_arr = [];
db.collection('med_ids').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        console.log(change.doc.data().med_id);
        temp_arr.push(change.doc.data().med_id);
    });
});

// Med ID registration form
const form = document.querySelector('#med_id_form');
if (form) {
    form.addEventListener('submit', evt => {
        evt.preventDefault();
        console.log(temp_arr);
        var state = 0;
        for (var i = 0; i < temp_arr.length; i++) {
            if (form.med_id.value == temp_arr[i]) {
                console.log(form.med_id.value + ' found');
                location.assign("/home");
                break;
            } else {
                state++;
            }
            if (state > 0) {
                location.assign("/?notFound");
                console.log(form.med_id.value + ' Not found');
            }

        }
    });
}//end if-form



// Patient form
const form2 = document.querySelector('#patient_form_id');
if (form2) {
    form2.addEventListener('submit', evt => {
        evt.preventDefault();

        if (!lat) {
            var text = '<span class="white-text text-darken-1"><b>Please Select Patient\'s Location<i class="material-icons">room</i></b></span>';
            M.toast({ html: text });
            document.getElementById('loader-wrapper2').style.display = 'none';
        } else {

            let date = new Date();
            // let time = date.getHours() + ":" + date.getMinutes();
            let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

            var patient_temp = '', patient_bp = '', patient_weight = '';
            if (form2.patient_temp.value == null || form2.patient_temp.value == "") {
                patient_temp = 'Non';
            } else {
                patient_temp = form2.patient_temp.value + '℃';
            }

            if (form2.patient_bp.value == null || form2.patient_bp.value == "") {
                patient_bp = 'Non';
                console.log('Non');
            } else {
                patient_bp = form2.patient_bp.value + 'mmHg';
            }

            if (form2.patient_weight.value == null || form2.patient_weight.value == "") {
                patient_weight = 'Non';
            } else {
                patient_weight = form2.patient_weight.value + 'kg';
            }

            const patient_info = {
                patient_name: form2.patient_name.value,
                patient_age: form2.patient_age.value,
                ageType: form2.ageType.value,
                sex: document.querySelector('input[name=sex]:checked').value,
                patient_temp: patient_temp,
                patient_bp: patient_bp,
                patient_weight: patient_weight,
                textarea1: form2.textarea1.value,
                priority: form2.priority.value,
                town: form2.town.value,
                location: form2.location.value,
                coordinates: new firebase.firestore.GeoPoint(lat, long),
                date: date.toDateString() + " " + time,
                actual_date: date,
                prescription1: 'none',
                prescription2: 'none',
                prescription3: 'none',
                diagnosis: 'none',
                extra_doctor_info: 'none',
                review_date: 'none',
                persist: 'no',
                review_state: false
            };

            console.log(patient_info);

            setTimeout(function () {
                document.getElementById('loader-wrapper2').style.display = 'none';
                var text = '<span class="white-text text-darken-1"><b>Data Submitted Successfully!<i class="material-icons">check_box</i></b></span>';
                M.toast({ html: text });
                form2.reset();
            }, 2000);

            db.collection('patient_info').add(patient_info)
                .catch(err => console.log(err));
        }//end if-lat
    });
}//end if-form



// Delete data
if (med_data) {
    med_data.addEventListener('click', evt => {
        if (evt.target.tagName === 'A') {
            const id = evt.target.getAttribute('data-id');
            console.log(id);
            db.collection('patient_info').doc(id).update({
                persist: 'yes'
            });
        }
    });
}