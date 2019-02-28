//Initialize last heartbeat to now
var lastHeartBeat = new Date();
//Mobiles dictionary to save mobile info
var mobiles = {};

//Update the mobile data
function updateMobileData(data) {
    mobiles[data.split(":")[0]] = data.split(":")[1];
}

//Update the house security status
function updater(data) {
  var isHome = false;
  for (var key in mobiles) {
    if (mobiles.hasOwnProperty(key)) {     
      var isTrue = (mobiles[key] == "true");      
      isHome = isHome || isTrue;
    }
  }
  if(!isHome) {
    alert("There has been a break in!");
    document.getElementById("houseGif").innerHTML = "<div style=\"width:100%;height:0;padding-bottom:56%;position:relative;\"><iframe src=\"https://giphy.com/embed/2siaob7JBzxLd8Qx9u\" width=\"100%\" height=\"100%\" style=\"position:absolute\" frameBorder=\"0\" class=\"giphy-embed\" allowFullScreen></iframe></div><p><a href=\"https://giphy.com/gifs/laffmobbslafftracks-trutv-laff-mobbs-tracks-lm118-2siaob7JBzxLd8Qx9u\">via GIPHY</a></p>";
    document.getElementById("reset").innerHTML = "<button class='btn btn-primary' onClick='reset()'>Reset Alarm</button>";
  }
}

// Get the current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(reportPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// get the current location and save it
function getHomeLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

function savePosition(position) {
    localStorage.lat = position.coords.latitude;
    localStorage.long = position.coords.longitude;
}

function reportPosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  if (lat - localStorage.lat + long - localStorage.long > 0.001){
    client.send("Mobile", "Mobile" + localStorage.clientID + ":false", qos=0);
  } else {
    client.send("Mobile", "Mobile" + localStorage.clientID + ":true", qos=0);
  }
}

function trackLife(time){
    if((time - lastHeartBeat) > 10000){
        document.getElementById("status").innerHTML = "Please check on your tracker.";
    } else {
        document.getElementById("status").innerHTML = "Motion Tracker: Alive";
    }
    lastHeartBeat = time;
}

function saveAddress(){
    if (!localStorage.lat) {
        confirm("Shall we save your present location as your home address?");
        getHomeLocation();
    }
}

//Save client id the first time
function saveClientID(){
  if (!localStorage.clientID) {
    localStorage.clientID = prompt("Please enter your client name");
  }
  if (!localStorage.photonID) {
    localStorage.photonID = prompt("Please enter your photon id");
  }
}

function publishMobileInfo() {
  getLocation();
}

function reset() {
  document.getElementById("houseGif").innerHTML = "<div style=\"width:100%;height:0;padding-bottom:56%;position:relative;\"><iframe src=\"https://giphy.com/embed/tHWaJAKfa7EWOBSNgQ\" width=\"100%\" height=\"100%\" style=\"position:absolute\" frameBorder=\"0\" class=\"giphy-embed\" allowFullScreen></iframe></div><p><a href=\"https://giphy.com/gifs/EuropeanSpaceAgency-animation-animated-tHWaJAKfa7EWOBSNgQ\"></a></p>";
  document.getElementById("reset").innerHTML = "";
}

saveClientID();
saveAddress();
setInterval(publishMobileInfo,30000);

//test function for alert
function test(message) {
  client.send("Alert", "Alert", qos=0);
}

//test function for mobile
function test2(message) {
  client.send("Mobile", message, qos=0);
}