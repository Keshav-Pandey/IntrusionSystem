// Create a client for connection
var client = new Paho.MQTT.Client("m16.cloudmqtt.com", Number(36185), "MobClientSubs" + localStorage.clientID );

//Assign handlers for connection
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

//Connect to client and add handler for on connection
client.connect({
  onSuccess:onConnect,
  userName: "wgxqfbpe",
  password: "9Kt5K58lpYPD",
  useSSL: true,
  mqttVersion: 3});

// Handler for on connect
function onConnect() {
  // Once a connection has been made, make a subscription to Mouse topic
  console.log("Connected");
  //Susbcribe to Alert status
  client.subscribe("Alert");
  //Susbcribe to Heartbeat
  client.subscribe("Heartbeat");
  //Susbcribe to Mobile
  client.subscribe("Mobile");
}

// Handler for connection lost
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    //Log connection lost
    console.log("Connection Lost : " + responseObject.errorMessage);
  }
}

// Handler for onMessagae
function onMessageArrived(message) {
  //Display the message which arrived
  console.log("Message Arrived : " + message.payloadString);
  //if its a hearbeat track it or else update status
  if(message.payloadString == "Alive"){
    trackLife(new Date());
  } else if (message.payloadString.includes("Mobile")){
    updateMobileData(message.payloadString);
  } else {
    updater(message.payloadString);
  }
}
