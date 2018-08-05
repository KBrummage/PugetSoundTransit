var stationsE = ["Vancouver, BC", "Bellingham", "Everett", "Seattle", "Tacoma", "Olympia"];
var stationsE = ["Pt. Townsend", "Pt. Gamble", "Kingston", "Port Orchard", "Shelton", "Olympia"];
var stationsIsl = ["Vashon Island", "Bainbridge Island", "Friday Harbor", "Victoria, BC"]

var station = "Seattle";

var allStations = ["Bainbridge Island", "Bellingham", "Everett", "Friday Harbor", "Kingston", "Olympia", "Pt. Gamble", "Port Orchard", "Pt. Townsend", "Seattle", "Shelton", "Tacoma", "Vancouver, BC", "Vashon Island", "Victoria, BC"];

var currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');

$(document).ready(function () {

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




  $("#info").append(`<div class="headline">${currentTime}</div>`);

  $("button").click(function () {
    // console.log($(this).text());
    var dataRef = firebase.database();
    station = $(this).text();
    console.log(station);
    $("#info").append(`<div><div class="headline">`)

    dataRef.ref().push({

      Station: station,
      // Destination: destination,
    });
  })
})