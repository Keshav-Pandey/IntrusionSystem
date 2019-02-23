// This #include statement was automatically added by the Particle IDE.
#include <MQTT.h>

/*****************************************************************************
IoT Project #4: Intruder Alert System

This program uses the PIR sensor to detect motion and publishes alerts and
heartbeats over the MQTT server for subsrcibers to take action.
******************************************************************************/
//Declaration for the callback function which is called when the photon receives a message
void callback(char* topic, byte* payload, unsigned int length);

int ledPin = D7;                 // choose the pin for the LED
int inputPin = D0;               // choose the PIR sensor pin
int loopCount = 0;              // counter for the number of loops we have run.

int motionCounter = 0;           // variable to count motion events
byte server[] = { 128,237,181,149 }; //MQTT host IP address
MQTT client(server, 1883, callback); //creating a new instance of the MQTT client

Timer timer(250, determineMotion); // software timer to check every 0.5s

//definition of the callback function. Kept empty as we do not need to subscribe to any topic, just publishing.
void callback(char* topic, byte* payload, unsigned int length) {
}

void setup() {
  pinMode(ledPin, OUTPUT);       // set LED as output
  pinMode(inputPin, INPUT);      // set sensor as input

  timer.start(); // start the determineMotion timer
  // connect to the server
  client.connect("IAS_Photon");
}

void determineMotion() {    // this function determines if there's motion
    if (motionCounter > 8) { // if the motion lasts for more than 2s then we publish an alert
        client.publish("Alert", "Motion Detected"); // publishing to Alert
        motionCounter = -120; // reset motion counter
    }
}

void loop() {
  if (loopCount++ == 20) {                  // sending a heartbeat out every 5s. (250ms delay x 20 delays = 5s delay.)
      client.publish("Heartbeat", "Alive"); // publishing to Heartbeat
      loopCount = 0;                        // resetting loopCount to 0 to avoid it from growing beyond memory.
  }
  if (digitalRead(inputPin) == HIGH) {  // check if the input is HIGH
    digitalWrite(ledPin, HIGH);         // turn LED ON if high
    motionCounter++;                    // increment motion counter
  } else {
    digitalWrite(ledPin, LOW);          // turn LED OFF if no input
    if (motionCounter < 0) {            // bringing the motion counter to eventual 0 allowing for a 30s pause between consecutive breakins.
        motionCounter++;                // increment motion counter
    } else {
        motionCounter = 0;              // resetting the motion counter
    }
  }
  delay(250);                           // wait 0.25s
}
