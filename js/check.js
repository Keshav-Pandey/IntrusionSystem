//get the table element
var table = document.getElementById("photonTable");
var lastHeartBeat = new Date();
//Update the house security status
function updater(data) {
    document.getElementById("houseGif").innerHTML = "<div style=\"width:100%;height:0;padding-bottom:56%;position:relative;\"><iframe src=\"https://giphy.com/embed/2siaob7JBzxLd8Qx9u\" width=\"100%\" height=\"100%\" style=\"position:absolute\" frameBorder=\"0\" class=\"giphy-embed\" allowFullScreen></iframe></div><p><a href=\"https://giphy.com/gifs/laffmobbslafftracks-trutv-laff-mobbs-tracks-lm118-2siaob7JBzxLd8Qx9u\">via GIPHY</a></p>";
    alert("There has been a break in!");
}
var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(reportPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

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
  position.coords.latitude +
  position.coords.longitude;
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
        prompt("Shall we save your present location as your home address?","Yes");
        getHomeLocation();
    }
}

saveAddress();
getLocation();