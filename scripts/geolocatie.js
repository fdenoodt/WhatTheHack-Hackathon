document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("navigator.geolocation works well");
}

// navigator.geolocation.getCurrentPosition(geolocationSuccess,[geolocationError],[geolocationOptions]);
 // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    var onSuccess = function(position) {
    

    firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
        location: position
    })
    
        /*
      var locatielatitude= 50.830405;
      var locatielongitude= 4.456488;
      var Accurracy = 0.01;
      var element = document.getElementById('geolocation');
      element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                          'Longitude: '          + position.coords.longitude             + '<br />' +
                          'Altitude: '           + position.coords.altitude              + '<br />' +
                          'Accuracy: '           + position.coords.accuracy              + '<br />' +
                          'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                          'Heading: '            + position.coords.heading               + '<br />' +
                          'Speed: '              + position.coords.speed                 + '<br />' +
                          'Timestamp: '          + position.timestamp                    + '<br />';

        if((position.coords.latitude >= locatielatitude - Accurracy && position.coords.latitude <= locatielatitude + Accurracy ) && (position.coords.longitude <= locatielongitude + Accurracy && position.coords.longitude >= locatielongitude - Accurracy )){
          if(position.coords.accuracy<500){
            console.log("location ok");
            $.ajax({
              type: 'POST',
              url: "../ceap/php/aanmelding.php",
              dataType: 'json',
              cache: false,
              data: {
                user: firebase.auth().currentUser.email  
              },
              success: function(result){
                var vandaag = new Date();
                var laatstedatum = new Date(result.data[0].datum);
                var maandvoorlaatstedatum = laatstedatum.setMonth(laatstedatum.getMonth()-1);
                if(maandvoorlaatstedatum>vandaag){
                  //GOOD
                }
                else if(laatstedatum >=vandaag){
                  //ORANGE
                  alert('orange');
                }
                else if(laatstedatum <vandaag){
                  // alert(result.data[0].reden);
                  alert('ROUGE');
                }
                else{
                  alert('RIP');
                }
                console.log(result);
              },
              fail: function(xhr, textStatus, errorThrown){
               alert('RIP');
            }
           });
          }else{
          console.log("Accurracy not ok");
          alert("Accurracy not ok");
          }
        }
        else{
          console.log("RIP");
          alert("RIP");
        }*/
        console.log('test');
  }

  // onError Callback receives a PositionError object
  //
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }

// navigator.geolocation.getCurrentPosition(onSuccess, onError);

function aanmelding(){
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  
}