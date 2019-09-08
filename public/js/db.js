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

// real-time listener
var temp_arr = [];
db.collection('med_ids').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        temp_arr.push(change.doc.data().med_id);
        // renderMed_id(change.doc.data().med_id);
    });
});


// Med ID registration form
const form = document.querySelector('#med_id_form');
if (form) {
    form.addEventListener('submit', evt => {
        evt.preventDefault();
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
            }

        }
    });
}



// Patient form
const form2 = document.querySelector('#patient_form_id');
if (form2) {
    form2.addEventListener('submit', evt => {
        evt.preventDefault();

        let date = new Date();
        let time = date.getHours() + ":" + date.getMinutes();

        const patient_info = {
            patient_name: form2.patient_name.value,
            patient_age: form2.patient_age.value,
            ageType: form2.ageType.value,
            sex: document.querySelector('input[name=sex]:checked').value,
            patient_temp: form2.patient_temp.value,
            patient_bp: form2.patient_bp.value,
            patient_weight: form2.patient_weight.value,
            textarea1: form2.textarea1.value,
            priority: form2.priority.value,
            location: form2.location.value,
            coordinates: new firebase.firestore.GeoPoint(lat, long),
            date: date.toDateString() + " " + time + 'Hrs'
        };

        console.log(patient_info);

        

        // db.collection('patient_info').add(patient_info)
        //     .catch(err => console.log(err));

    });
}
