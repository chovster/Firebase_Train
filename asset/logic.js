  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBvzutE3eK1_lG2jEJk0K37EeAuNcdqTs4",
    authDomain: "rich-eabae.firebaseapp.com",
    databaseURL: "https://rich-eabae.firebaseio.com",
    projectId: "rich-eabae",
    storageBucket: "rich-eabae.appspot.com",
    messagingSenderId: "657818095649"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

// Submit button here
$('#add-train').on('click', function() {
    event.preventDefault();  //prevent form from trying to submit/refresh the page

  //Grabs user input
    var trainName= $("#train-input").val().trim();
    var destination= $("#destination-input").val().trim();
    var firstTrainTime= $("#firstTrain-input").val().trim();
    var frequency= $("#frequency-input").val().trim();

    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTrainTime);
    // console.log(frequency);

  //Creats local "temporary" object for holding train data
    var trainInfo= {
      name: trainName,
      where: destination,
      trainTime: firstTrainTime,
      wait: frequency
      };

  // Uploads train data to the database
    database.ref().push(trainInfo);

    // Logs everthing to console
    console.log(trainInfo.name);
    console.log(trainInfo.where);
    console.log(trainInfo.trainTime);
    console.log(trainInfo.wait);

    // alert 
    alert("Train Successfully Added");

    // Clears all of the text-boxes after pressing submit button
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
});

// Create Firebase event for adding train to teh database and a row in
// in the html whena user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    //Store everything into a variable. 
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().where;
    var firstTrainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().wait;

    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

  // Giving values to these variables
  var tFrequency= frequency;
  var firstTrain= firstTrainTime;

  // First time (pushed back 1 day to make sure it comes before current time and convert time)
  var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "days");
  console.log(firstTimeConverted);

  //current time
  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference in time: " + diffTime);

  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  var tMinutesTillTrain= tFrequency - tRemainder;
  console.log("Minutes till train: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm a");
  console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

  $(".table-body").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency 
    + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
// defaultDatabase.ref().once("value", function(snapshot) {
//   snapshot.forEach(function(child){
//     createTable(child.val());
//   });
// });



// database.ref().push({
//   name: empName,
//   role: role,
//   startDate: startDate,
//   monthlyRate: monthlyRate

//  dateAdded: firebase.database.ServerValue.TIMESTAMP 