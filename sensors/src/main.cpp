#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <ArduinoJson.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <AsyncJson.h>

// Define constant for the sea level pressure
// 1013.25 is the standard pressure at sea level
#define SEALEVELPRESSURE_HPA (1013.25) 


// Initialize the sensor
Adafruit_BME280 bme; // I2C

// Credentials for ESP8266 in AP mode
const char *AP_ssid = "ESP8266-Access-Point";
const char *AP_password = "123456789";
IPAddress apIP(192, 168, 1, 1);

// Credentials for ESP8266 in STA mode
const char *STA_ssid;
const char *STA_password;

// MQTT broker credentials
const char *mqttServer;  
int mqttPort;            
const char *mqttUsername; 
const char *mqttPassword; 
const char *sensorId;    

// Enable the client to connect to the MQTT broker when receiving the credentials
boolean mqttCredentials = false;

// Enable to show IP address for WIFI
boolean showWifiIP = false;

// MQTT status
char *mqttStatus = "disconnected";

// Initialize AsyncWebServer object on port 80
AsyncWebServer server(80);

//
WiFiClient wifiClient;
PubSubClient client(wifiClient);

unsigned long lastMsg = 0;
const int READ_CYCLE_TIME = 5000;

// --------------------------------------------------------------
// HTML page for WiFi connection
// --------------------------------------------------------------
const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="text-align: center">
    <h1>ESP8266 WiFi Connection</h1>
    <form id="wifi-form" action="/connect">
      <label for="ssid">SSID:</label>
      <select id="ssid" name="ssid">
        <option>Choose a network</option>
        </select>
      <br /><br />
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" /><br /><br />
      <button type="submit">Connect</button>
    </form>
    <script>
      async function populateNetworks() {
        var select = document.getElementById("ssid");
        select.replaceChildren();
        var options = await fetch("/networks")
          .then((res) => res.json())
          .then((result) => result.map((network) => network.ssid));

        for (var i = 0; i < options.length; i++) {
          var opt = options[i];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          select.appendChild(el);
        }
      }
      populateNetworks();
      setInterval(populateNetworks, 5000);
    </script>
  </body>
</html>
)rawliteral";


// --------------------------------------------------------------
// BME280 sensor setup function
// --------------------------------------------------------------
void setupBME280()
{
    unsigned status;
    // Begin BME280 sensor with address 0x76
    status = bme.begin(0x76);

    // Check if the sensor was successfully found
    if (!status)
    {
        Serial.println("Could not find a valid BME280 sensor!");
        while (1)
            delay(10);
    }
}


// --------------------------------------------------------------
// MQTT Reconnect function
// --------------------------------------------------------------
void reconnect()
{
    // Loop until the client is not connected
    while (!client.connected())
    {
        Serial.print("Attempting MQTT connection...");
        if (client.connect(sensorId, mqttUsername, mqttPassword))
        {
            // Change status to connected
            mqttStatus = "connected";
            Serial.println("connected");
        }
        else
        {
            // Change status to failed
            mqttStatus = "failed";
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" try again in 1 second");
            // Wait 1 second before retrying
            delay(1000);
        }
    }
}


// --------------------------------------------------------------
// MQTT Send values function
// --------------------------------------------------------------
void loopMQTT()
{
    // Read temperature, humidity and pressure from the BME280 sensor
    float temperature = bme.readTemperature();
    float humidity = bme.readHumidity();
    float pressure = bme.readPressure() / 100.0F;
    float altitude = bme.readAltitude(SEALEVELPRESSURE_HPA); 

    // Allocate a temporary JsonDocument
    StaticJsonDocument<256> doc;

    doc["temperature"].set(temperature);
    doc["humidity"].set(humidity);
    doc["pressure"].set(pressure);
    doc["altitude"].set(altitude);

    String msg;
    // Serialize JSON to a string
    if (serializeJson(doc, msg) == 0)
    {
        Serial.println(F("Failed to serialize to json"));
        return;
    }

    // Format the string using sensor ID
    char *topic;
    asprintf(&topic, "%s/%s", "sensor", sensorId);

    Serial.println("Publish message: " + msg);
    if (client.connect(sensorId, mqttUsername, mqttPassword))
    {
        // Publish the message
        client.publish(topic, msg.c_str());
    }
}


// --------------------------------------------------------------
// Setup function
// --------------------------------------------------------------
void setup()
{
    Serial.begin(9600);
    // Call the setup function for the sensor
    setupBME280();

    // Setup ESP8266 in Access Point mode
    Serial.print("Setting AP (Access Point)…");
    WiFi.mode(WIFI_AP_STA);
    WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
    WiFi.softAP(AP_ssid, AP_password);
    IPAddress IP = WiFi.softAPIP();
    Serial.print("AP IP address: ");
    Serial.println(IP);

    // Route for root page
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send_P(200, "text/html", index_html); });

    // Route for scanning available networks
    server.on("/networks", HTTP_GET, [](AsyncWebServerRequest *request)
              { String json = "[";
                int n = WiFi.scanComplete();
                if(n == -2){
                    WiFi.scanNetworks(true);
                } else if(n){
                    for (int i = 0; i < n; ++i){
                        if(i) json += ",";
                        json += "{";
                        json += "\"rssi\":"+String(WiFi.RSSI(i));
                        json += ",\"ssid\":\""+WiFi.SSID(i)+"\"";
                        json += ",\"bssid\":\""+WiFi.BSSIDstr(i)+"\"";
                        json += ",\"channel\":"+String(WiFi.channel(i));
                        json += ",\"secure\":"+String(WiFi.encryptionType(i));
                        json += ",\"hidden\":"+String(WiFi.isHidden(i)?"true":"false");
                        json += "}";
                    }
                    if(WiFi.scanComplete() == -2){
                        WiFi.scanNetworks(true);
                    }
                }
                json += "]";
                Serial.println(json);
                request->send(200, "application/json", json);
                json = String(); });

    // Route for connecting to network
    server.on("/connect", HTTP_GET, [](AsyncWebServerRequest *request)
            { 
                // Save credentials
                if(request->hasParam("ssid")){
                    STA_ssid=request->getParam("ssid")->value().c_str();
                };
                if(request->hasParam("password")){
                    STA_password=request->getParam("password")->value().c_str();
                }
                WiFi.disconnect();
                
                // Change WIFI mode and connect
                WiFi.mode(WIFI_STA);
                WiFi.begin(STA_ssid, STA_password);

                request->send(200, "text/plain", "OK"); });

    // Route for onboard sensor
    AsyncCallbackJsonWebHandler *onboardHandler = new AsyncCallbackJsonWebHandler("/onboard", [](AsyncWebServerRequest *request, JsonVariant &json)
            { 
                // Cast the Json Document to a Json Object
                JsonObject obj = json.as<JsonObject>();

                // Save credentials
                mqttServer = obj["mqttServer"];
                mqttUsername = obj["mqttUsername"];
                mqttPassword = obj["mqttPassword"];
                mqttPort = obj["mqttPort"];
                sensorId=obj["sensorId"];

                // Disconnect from mqtt server
                client.disconnect();
                // Set a keep alive interval
                client.setKeepAlive(60); 
                // Set the socket timeout
                client.setSocketTimeout(60);

                // Set the MQTT server
                client.setServer(mqttServer, mqttPort);

                mqttCredentials=true;
                request->send(200, "text/plain", "OK"); });

    // Register the onboardHandler function
    server.addHandler(onboardHandler);
    // Start server
    server.begin();
}


// --------------------------------------------------------------
// Loop function
// --------------------------------------------------------------
void loop()
{
    // Verify if the credentials for WIFI connection are received
    if (!STA_ssid)
    {
        return;
    }

    // Waiting for connection
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    if(WiFi.status() == WL_CONNECTED && !showWifiIP){
        Serial.println("");
        Serial.println("WiFi connected");
        Serial.println("IP address: ");
        // Print the IP address
        Serial.println(WiFi.localIP());
        // Set variable to true to show the IP only once
        showWifiIP=true;
    }
        
    if (!mqttCredentials){
        return;
    }

    // Listen for mqtt message and reconnect if disconnected
    reconnect();
    if (!client.loop())
    {
        client.connect(sensorId, mqttUsername, mqttPassword);
    }

    unsigned long now = millis();
    if ((now - lastMsg) > READ_CYCLE_TIME)
    {
        lastMsg = now;
        //  Publish MQTT messages
        loopMQTT();
    }
}
