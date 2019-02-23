// Create a client for connection
var client = new Paho.MQTT.Client("128.237.181.149", Number(9002), "MobClientSubs" + Math.floor(Math.random() * 11) );

//Assign handlers for connection
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

//Connect to client and add handler for on connection
client.connect({onSuccess:onConnect});

// Handler for on connect
function onConnect() {
  // Once a connection has been made, make a subscription to Mouse topic
  console.log("Connected");
  //Susbcribe to Alert status
  client.subscribe("Alert");
  //Susbcribe to Heartbeat
  client.subscribe("Heartbeat");
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
  if(message.payloadString == "Alive"){
      trackLife(new Date());
  } else {
      updater(message.payloadString);
  }
}