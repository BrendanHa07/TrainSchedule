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

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";

$("#submitButton").on("click", function(){

	event.preventDefault();

	 trainName = $("#train-input").val().trim();
	 destination = $("#destination-input").val().trim();
	 firstTrain = $("#time-input").val().trim();
	 frequency = $("#frequency-input").val().trim();

console.log(trainName);

	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	});

});

database.ref().on("child_added", function(childsnapshot) {

	 trainName = childsnapshot.val().trainName;
	 destination = childsnapshot.val().destination;
	 firstTrain = childsnapshot.val().firstTrain;
	 frequency = childsnapshot.val().frequency;

	 console.log(childsnapshot.val().trainName);

	 var firstTrainConverted = moment(childsnapshot.val().firstTrain, "hh:mm");
	 console.log(firstTrainConverted);
	 var timeSinceFirstTrain = moment().diff(firstTrainConverted, "minutes");
	 console.log(timeSinceFirstTrain);
	 var minutesSinceLastTrain = timeSinceFirstTrain % parseInt(childsnapshot.val().frequency);
	 console.log(minutesSinceLastTrain + " minutes");
	 var minutesTilNextTrain = parseInt(childsnapshot.val().frequency) - minutesSinceLastTrain;
	 console.log(minutesSinceLastTrain);
	 var nextTrain = moment().add(minutesTilNextTrain, "m");
	 console.log(nextTrain);

	$(".table").find("tbody").append("<tr><td>"
        + childsnapshot.val().trainName + "</td><td>"+ childsnapshot.val().destination + "</td><td>"+ childsnapshot.val().frequency + "</td><td>" + nextTrain.format("HH:mm A") + "</td><td>" + minutesTilNextTrain + "</td></tr>")

 });

setInterval(function() {
	location.reload();
}, 60000);





