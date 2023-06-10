#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <ArduinoJson.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include "LittleFS.h"
#include <AsyncJson.h>
#include <config.h>

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME280 bme; // I2C

// ESP8266 in AP mode
const char *AP_ssid = "ESP8266-Access-Point";
const char *AP_password = "123456789";
IPAddress apIP(192, 168, 1, 1);

//ESP8266 in STA mode
const char *ssid;
const char *password;

// MQTT broker credentials
// const char *mqttServer; //= "192.168.1.138";
// int mqttPort; // = 1883;
// const char *mqttUsername; // = "hta-sensor";
// const char *mqttPassword;// = "amalia";
// const char *sensorId;// = "1222";

boolean mqttCredentials = false;
char *mqttStatus = "disconnected";

Config config;

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

WiFiClient wifiClient;
PubSubClient client(wifiClient);

unsigned long lastMsg = 0;
const int READ_CYCLE_TIME = 5000;

// HTML page for wifi connection
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

void reconnect()
{
    // Loop until we're reconnected
    while (!client.connected())
    {
        Serial.print("Attempting MQTT connection...");

        // Attempt to connect
        if (client.connect(config.sensorId, config.mqttUsername, config.mqttPassword))
        {
            mqttStatus = "connected";
            Serial.println("connected");
        }
        else
        {
            mqttStatus = "failed";
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" try again in 1 second");
            // Wait 1 second before retrying
            delay(1000);
        }
    }
}

void setupBME280()
{
    unsigned status;
    // default settings
    status = bme.begin(0x76);
    if (!status)
    {
        Serial.println("Could not find a valid BME280 sensor!");
        while (1)
            delay(10);
    }
}

void loopMQTT()
{
    // Read temperature, humidity and pressure from the BME280 sensor
    float temperature = bme.readTemperature();
    float humidity = bme.readHumidity();
    float pressure = bme.readPressure() / 100.0F;
    float altitude = bme.readAltitude(1013.25); // 1013.25 is the standard pressure at sea level

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

    char *topic;
    asprintf(&topic, "%s/%s", "sensor/", config.sensorId);

    Serial.println("Publish message: " + msg);
    if(client.connect(config.sensorId, config.mqttUsername, config.mqttPassword)){
        client.publish(topic, msg.c_str());
    }
}

void setupFileSystem(void)
{
  SPIFFSConfig cfg;
  cfg.setAutoFormat(true);
  LittleFS.setConfig(cfg);

  // mount file system
  while (!LittleFS.begin())
  {
    Serial.println(F("Could not mount the FS"));
    delay(500);
  }
}

void printFile(const char *filename)
{
  // Open file for reading
  File file = LittleFS.open(filename, "r");
  if (!file)
  {
    Serial.println(F("Failed to read file"));
    return;
  }

  // Extract each characters by one by one
  while (file.available())
  {
    Serial.print((char)file.read());
  }
  Serial.println();

  // Close the file
  file.close();
}

void setup()
{
    Serial.begin(9600);
    // setup bme280
    setupBME280();
    setupFileSystem();
    config.load();
    printFile("/config.txt");

   
    // setup ESP8266 in Access Point mode
    Serial.print("Setting AP (Access Point)…");
    WiFi.mode(WIFI_AP_STA);
    WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
    WiFi.softAP(AP_ssid, AP_password);

    IPAddress IP = WiFi.softAPIP();
    Serial.print("AP IP address: ");
    Serial.println(IP);
    


    // Route for root / web page
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send_P(200, "text/html", index_html); });
    // Route for available networks
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
    // Route for connect to network
    server.on("/connect", HTTP_GET, [](AsyncWebServerRequest *request)
              { 
                if(request->hasParam("ssid")){
                    ssid=request->getParam("ssid")->value().c_str();
                };
                if(request->hasParam("password")){
                    password=request->getParam("password")->value().c_str();
                }
                WiFi.disconnect();
                WiFi.mode(WIFI_STA);
                WiFi.begin(ssid, password);

                config.ssid=ssid;
                config.password=password;
                config.save();

                request->send(200, "text/plain", "OK"); });
    // Route for setup mqtt credentials
   
    AsyncCallbackJsonWebHandler* onboardHandler = new AsyncCallbackJsonWebHandler("/onboard",[](AsyncWebServerRequest *request, JsonVariant &json)
              { 
                
                // Cast the Json Document to a Json Object
                JsonObject obj = json.as<JsonObject>();

                // Write the values from json object to the config
                config.mqttServer = obj["mqttServer"];
                config.mqttUsername = obj["mqttUsername"];
                config.mqttPassword = obj["mqttPassword"];
                config.mqttPort = obj["mqttPort"];
                config.sensorId=obj["sensorId"];

                // Connect to the MQTT broker
                // client.setServer(mqttBroker, mqttPort);
                client.disconnect();
                client.setKeepAlive(60); 
                client.setSocketTimeout(60);
                client.setServer(config.mqttServer, config.mqttPort);

                mqttCredentials=true;
                request->send(200, "text/plain", "OK"); });
    server.addHandler(onboardHandler);
    // Start server
    server.begin();
}

void loop()
{
    if (!ssid)
    {
        return;
    }

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    if(!mqttCredentials) return;

    // Listen for mqtt message and reconnect if disconnected
    
    reconnect();
    if(!client.loop()){
        client.connect(config.sensorId, config.mqttUsername, config.mqttPassword);
    }

    unsigned long now = millis();
    if ((now - lastMsg) > READ_CYCLE_TIME)
    {
        Serial.println("");
        Serial.println("WiFi connected");
        Serial.println("IP address: ");
        Serial.println(WiFi.localIP());

        lastMsg = now;

        //  Publish MQTT messages
        loopMQTT();
    }
    
}
