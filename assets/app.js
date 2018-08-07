var stationsE = ["Vancouver, BC", "Bellingham", "Everett", "Seattle", "Tacoma", "Olympia"];
var stationsE = ["Pt. Townsend", "Pt. Gamble", "Kingston", "Port Orchard", "Shelton", "Olympia"];
var stationsIsl = ["Vashon Island", "Bainbridge Island", "Friday Harbor", "Victoria, BC"]

var station = "Seattle";

var allStations = ["Bainbridge Island", "Bellingham", "Everett", "Friday Harbor", "Kingston", "Olympia", "Pt. Gamble", "Port Orchard", "Pt. Townsend", "Seattle", "Shelton", "Tacoma", "Vancouver, BC", "Vashon Island", "Victoria, BC"];


function displayTime() {
  var time = moment().format('HH:mm:ss');
  $('#clock').html(time);
  setTimeout(displayTime, 1000);
}

var database;

$(document).ready(function () {

  displayTime();
  for (var i = 0; i < allStations.length; i++) {
    
    if (allStations[i] !== "Seattle") {
      $("#DestinationSelect").append(`<option>${allStations[i]}</option>`)
    }
  }

  $(document).on("submit", function (event) {
    event.preventDefault();
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#DestinationSelect").val().trim();
    var frequency = parseInt($("#FrequencyID").val().trim());
    var firstArrival = $("#ArrivalID").val().trim();

    var data = {
      nameData: trainName,
      destinationData: destination,
      frequencyData: frequency,
      firstArrivalData: firstArrival
    }

    AdminData.push(data);

    var firstArrivalConverted = moment(firstArrival, "HH:mm").subtract(frequency, "years");
    console.log(firstArrivalConverted);

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstArrivalConverted), "minutes");
    console.log("Difference in time" + diffTime);

    var timeRemaining = diffTime % frequency;
    console.log(timeRemaining);

    var nextTrain = moment().add(timeRemaining, "minutes");
    var nextArrival = nextTrain.format("hh:mm");
    console.log(nextArrival);
    console.log(moment());

    $("#tableBody").append(` 
      <tr>
        <td scope = "col">${trainName}</td>
        <td scope = "col">${destination}</td>
        <td scope = "col">${frequency}</td>
        <td scope = "col">${nextArrival}</td>
        <td scope = "col">${timeRemaining}</td>
      </tr>`
  
)


  })

//configure database with firebase
  var config = {
    apiKey: "AIzaSyD7rntgC4QnbllAUURTh1OVnwRUq3gv0W4",
    authDomain: "pugetsoundtransit.firebaseapp.com",
    databaseURL: "https://pugetsoundtransit.firebaseio.com",
    projectId: "pugetsoundtransit",
    storageBucket: "pugetsoundtransit.appspot.com",
    messagingSenderId: "877703187461"
  };
  //initialize
  firebase.initializeApp(config);
  database = firebase.database();
  var AdminData = database.ref('AdminData');
  var TrainData = database.ref('TrainData');





  TrainData.on('value', gotData, errData);
  AdminData.on('value', gotData, errData);

  function gotData(data) {
    console.log(data.val());

  }

  function errData(err) {
    console.log('Error!');
    console.log(err);
  }

  $("button").click(function () {
    console.log($(this).text());


  });

  $(document).on("submit", function(){
    



  })

})