var config = {
    apiKey: "AIzaSyC658IU57YQiQZ3eFMMJWQ1X5UtdFgW-Po",
    authDomain: "train-schedule-aa59e.firebaseapp.com",
    databaseURL: "https://train-schedule-aa59e.firebaseio.com",
    projectId: "train-schedule-aa59e",
    storageBucket: "train-schedule-aa59e.appspot.com",
    messagingSenderId: "623181994509"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#submitButton").on("click", function(){

	event.preventDefault();

	var trainName = $("#train-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrain = moment($("#time-input").val().trim(), "HH:mm");
	var frequency = $("#frequency-input").val().trim();


	database.ref().set({
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	});
});



database.ref().on("child_added", function(childsnapshot) {

	var trainName = childsnapshot.val().trainName;
	var destination = childsnapshot.val().destination;
	var firstTrain = childsnapshot.val().firstTrain;
	var frequency = childsnapshot.val().frequency;



	var convertedTime = moment(firstTrain, "HH:mm").subtract(1, "years");
	console.log(convertedTime);

	var currentTime = moment().format("HH:mm");
	console.log("Current time: " + currentTime);

	var timeDifference = moment().diff(moment(convertedTime), "minutes");
	console.log("Time difference: "+ timeDifference);

	var timeRemainder = timeDifference % frequency;


})

