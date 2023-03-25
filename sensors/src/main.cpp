#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// BME280 sensor
Adafruit_BME280 bme;

// WiFi credentials
const char* ssid = "MERCUSYS_E0C1";
const char* password = "amalia19";

// MQTT broker information
const char* mqtt_username = "hta-sensor";
const char* mqtt_password = "amalia";
const char* mqtt_topic = "hta-sensor1";
char mqtt_server[15]; // Create a character array to hold the IP address
const int mqtt_port = 1883;

// WiFi and MQTT client objects
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

void setupWiFi(){
    // Connect to WiFi network
    Serial.print("Connecting to Wifi");

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        Serial.println(".");
        delay(1000);
    }

    Serial.println("Connected to WiFi!");
}

void setupMQTT(){
    IPAddress ip = WiFi.localIP();
    sprintf(mqtt_server, "%d.%d.%d.%d", ip[0], ip[1], ip[2], ip[3]+2);
    
    // Connect to the MQTT broker
    mqttClient.setServer(mqtt_server, mqtt_port);
    // mqttClient.setServer("192.168.1.133", 1883);
    
    while (!mqttClient.connected()) {
        Serial.println("Connecting to MQTT broker...");
        if (mqttClient.connect("sensor1", mqtt_username, mqtt_password)) {
            Serial.println("Connected to MQTT broker");
        } else {
            Serial.print("Failed with state ");
            Serial.println(mqttClient.state());
            delay(2000);
        }
    }

    // Initialize BME280 sensor
    if (!bme.begin(0x76)) {
        Serial.println("Could not find a valid BME280 sensor, check wiring!");
        while (1);
    }
}

void loopMQTT(){
    // Read temperature, humidity and pressure from the BME280 sensor
    float temperature = bme.readTemperature();
    float humidity = bme.readHumidity();
    float pressure = bme.readPressure() / 100.0F;
    float altitude = bme.readAltitude(1013.25); // 1013.25 is the standard pressure at sea level
    
    // Allocate a temporary JsonDocument
    StaticJsonDocument<256> doc;

    // Set the values in the json document
    doc["name"].set(1);
    doc["type"].set("htpa");
    JsonObject values = doc.createNestedObject("values");
    values["temperature"].set(temperature);
    values["humidity"].set(humidity);
    values["pressure"].set(pressure);
    values["altitude"].set(altitude);

    String msg;
    // Serialize JSON to a string
    if (serializeJson(doc, msg) == 0)
    {
      Serial.println(F("Failed to serialize to json"));
      return;
    }

    char *topic;
    asprintf(&topic, "%s/%s", "sensor", "/1");

    Serial.println("Publish message: " + msg);
    mqttClient.publish(topic, msg.c_str());
}

void setup() {
    // Initialize serial port
    Serial.begin(9600);
    delay(1000);

    setupWiFi();
    setupMQTT();
    
}


void loop() {

    loopMQTT();
    // Wait for a few seconds before publishing again
    delay(5000);
}