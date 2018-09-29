
$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyCrXyXz07HKsYORgg6Dyg2HHmqwPgiVZpk",
    authDomain: "train-scheduler-b73ed.firebaseapp.com",
    databaseURL: "https://train-scheduler-b73ed.firebaseio.com",
    projectId: "train-scheduler-b73ed",
    storageBucket: "train-scheduler-b73ed.appspot.com",
    messagingSenderId: "812008153925"
  };
  firebase.initializeApp(config);

  database = firebase.database();

  $(".submit-button").on("click", function (event) {
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var destination = $("#destination").val().trim();
    var startTime = $("#start-time").val().trim();
    var frequency = $("#frequency").val().trim();

    var convertTime = moment(startTime, "hh:mm").subtract(1, "years");
    console.log(convertTime);

    var currentTime = moment();
    console.log(currentTime.format("hh:mm"));

    var timeDifference = moment().diff(moment(convertTime), "minutes");
    console.log(timeDifference);

    var remainder = timeDifference % frequency;
    console.log(remainder);

    var minutesAway = frequency - remainder;
    console.log(minutesAway);

    nextTrain = moment().add(minutesAway, "minutes").format("hh:mm");
    console.log(moment(nextTrain).format("h:mm"));

    setInterval( function(){ 
      minutesAway = frequency - remainder;
    },1000);

    firebase.database().ref().push({
      name: name,
      destination: destination,
      nextTrain:nextTrain,
      frequency: frequency,
      minutesAway: minutesAway,

    });
});


  database.ref().on("child_added", function (childSnapshot) {

    $("#add-train").append("<tr>"
    + "<td scope='col' >" + childSnapshot.val().name + "</td>"
    + "<td scope='col'>" + childSnapshot.val().destination + "</td>"
    + "<td scope='col'>" + childSnapshot.val().frequency + "</td>"
    + "<td scope='col'>" + childSnapshot.val().nextTrain+ "</td>"
  + "<td scope='col'>" + childSnapshot.val().minutesAway + "</td>");

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().nextTrain);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().minutesAway);


  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


  // database.ref().limitToLast(1).on("child_added", function (childSnapshot) {
    
  //   $("#add-train").append("<tr>"
  //     + "<td scope='col' >" + childSnapshot.val().name + "</td>"
  //     + "<td scope='col'>" + childSnapshot.val().destination + "</td>"
  //     + "<td scope='col'>" + childSnapshot.val().frequency + "</td>"
  //     + "<td scope='col'>" + childSnapshot.val().nextTrain+ "</td>"
  //   + "<td scope='col'>" + childSnapshot.val().minutesAway + "</td>");
  // });
});
