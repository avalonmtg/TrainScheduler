
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCpkMVV6-ehv3VhtxDRAAZgCIGIAeBFvuc",
    authDomain: "js-trainscheduler.firebaseapp.com",
    databaseURL: "https://js-trainscheduler.firebaseio.com",
    projectId: "js-trainscheduler",
    storageBucket: "js-trainscheduler.appspot.com",
    messagingSenderId: "359080340574",
    appId: "1:359080340574:web:5561e704915e8aa0fa58cf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  // 2. Button to Add Train
  $("#add-train").on("click", function(event) {
    event.preventDefault();
  
    // user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainStart = $("#trainStart-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
 
    var addTrain = {
      trainName: trainName,
      destination: destination,
      trainStart: trainStart,
      frequency: frequency,
  };

  database.ref().push(addTrain);

  console.log(addTrain.trainName);
  console.log(addTrain.destination);
  console.log(addTrain.trainStart);
  console.log(addTrain.frequency);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#trainStart-input").val("");
  $("#frequency-input").val("");

});

  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().trainStart;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(trainStart);
    console.log(frequency);

//moment
var timeArray = trainStart.split(":");
console.log(timeArray);
var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
console.log(trainTime);
var max = moment.max(moment(), trainTime);
console.log("max",max);
var minutesAway;
var nextArrival;

if (max===trainTime) {
  nextArrival=trainTime.format("hh:mm A");
  minutesAway=trainTime.diff(moment(),"minutes");
}

else {
  var difference = moment().diff(trainTime,"minutes");
  var remainder = difference%frequency;
  minutesAway=frequency-remainder;
  nextArrival= moment().add(minutesAway, "m").format("hh:mm A");
}


    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
