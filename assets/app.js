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
for(var i=0; i < allStations.length; i++){
  if(allStations[i] !== "Seattle"){
    $("#DestinationSelect").append(`<option>${allStations[i]}</option>`)
  }
}
  
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


  //firebase is now connected to my .js  
  // 'ref' is how we get info.  Each entry has an id.
  database = firebase.database();
  var TrainData = database.ref('TrainData');

  TrainData.on('value', gotData, errData);

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


})