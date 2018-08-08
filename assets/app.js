var stationsE = ["Vancouver, BC", "Bellingham", "Everett", "Seattle", "Tacoma", "Olympia"];
var stationsE = ["Pt. Townsend", "Pt. Gamble", "Kingston", "Port Orchard", "Shelton", "Olympia"];
var stationsIsl = ["Vashon Island", "Bainbridge Island", "Friday Harbor", "Victoria, BC"]

var station = "Seattle";

var routeObject;
var routeNames;
var routeName;
var routeInfo;


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
  })

function gotAdminData(data){
var firstArrival = data.val().firstArrivalData;
var frequency = data.val().frequencyData;
var trainName = data.val().nameData;
var destination = data.val().destinationData;
debugger;
    var firstArrivalConverted = moment(firstArrival, "HH:mm").subtract(frequency, "days");
    console.log(firstArrivalConverted);

    var diffTime = moment().diff(moment(firstArrivalConverted), "minutes");
    console.log("Difference in time" + diffTime);

    var timeRemaining = diffTime % frequency;
    console.log(timeRemaining);

    var nextTrain = moment().add(timeRemaining, "minutes");
    var nextArrival = nextTrain.format("hh:mm");
    console.log(nextArrival);
    console.log(moment());

    $("#tableBody").prepend(` 
      <tr>
        <td scope = "col">${trainName}</td>
        <td scope = "col">${destination}</td>
        <td scope = "col">${frequency}</td>
        <td scope = "col">${nextArrival}</td>
        <td scope = "col">${timeRemaining}</td>
      </tr>`

    )


  }

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
  AdminData.on('child_added', gotAdminData, errData);

  function gotData(data) {
    
    routeObject = data.val();
    routeNames = Object.keys(routeObject);
    
  
  for (var i = 0; i < routeNames.length; i++){
   
  }
}
  

  function errData(err) {
    console.log('Error!');
    console.log(err);
  }


  // $("button").click(function () {
  //   var city = $(this).text();
  //   $("#trainStation").text($(this).text());
  //   $("#timeTable").html(`<table class="table">
  //       <thead>
  //           <tr>
  //               <th scope="col">Train Route</th>
  //               <th scope="col">Arrival</th>
  //               <th scope="col">Minutes Away</th>
  //           </tr>
  //       </thead>
  //       <tbody id="tableBody">
  //       </tbody>
  //   </table>`)

  //   for (var i = 0; i < routeNames.length; i++) {
  //     routeName = routeNames[i];
  //     routeInfo = routeObject[routeName];
     
  //     if(routeInfo[city] !== undefined){
  //       var start = new Date();
  //       start.setHours(0,0,0,0);
  //       moment(start).format("HH:mm");
        
  //       var Arrival = 600 + routeInfo[city].Arrival;
        
  //       var ArrivalConvertedMil = moment(start).add(Arrival, "minutes");
  //       console.log(ArrivalConvertedMil + "<-ArrivalMilitary") 
  //       var ArrivalConvertedCol = ArrivalConvertedMil.format("HHmm");
  //       console.log(ArrivalConvertedCol + "<-ArrivalMilitaryNoColon");
  //       var ArrivalConverted = moment(ArrivalConvertedMil).format("hh:mm");
  //       console.log(ArrivalConverted + "<-ArrivalTimeStandard");


  //       var nowMil = moment().format("HH:mm");
  //       console.log(nowMil + "<-Current Military")       
  //       var nowMilCol = moment(nowMil).format("HHmm");
  //       console.log(nowMilCol + "<-now Military no colon")
  //       var now = moment(nowMil).format("hh:mm");
  //       console.log(now + "<-current standard");
       
  //       console.log(parseInt(ArrivalConvertedCol));
  //       console.log(parseInt(nowMilCol));

  //       if(moment(nowMil) parseInt(nowMilCol)){
  //         console.log(ArrivalConvertedMil);
  //         $("#tableBody").append(`<tr>
  //                                   <td scope="col">${routeName}</td>
  //                                   <td scope="col">${ArrivalConverted}</td>
  //                                   <td scope="col">" "</td>
  //                                   </tr>`);
  //         console.log(ArrivalConverted);
  //       }
  //       //if moment() > arrival time display train route, arrival, minutes away.


  //     }
      

  //   }


  // });

})