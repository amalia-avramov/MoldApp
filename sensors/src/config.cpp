#include "config.h"
#include <stdlib.h>
#include <string.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include "LittleFS.h"

#define CONFIG_FILE "/config.txt"

void Config::load()
{
    const char *filename = CONFIG_FILE;
    if (LittleFS.exists(filename))
    {

        Serial.println("Reading config file");

        File file = LittleFS.open(filename, "r");

        if (file)
        {
            Serial.println("File found. Deserializing...");

            // Allocate a temporary JsonDocument
            StaticJsonDocument<512> doc;

            // Deserialize the JSON document
            DeserializationError error = deserializeJson(doc, file);

            // If deserialization fails, log it and return
            if (!error)
            {
                JsonObject obj = doc.as<JsonObject>();
                // Copy values from the JsonDocument to the Config
                mqttServer = obj["mqttServer"].as<String>().c_str();
                mqttUsername = obj["mqttUsername"].as<String>().c_str();
                mqttPassword = obj["mqttPassword"].as<String>().c_str();
                sensorId = obj["sensorId"].as<String>().c_str();
                mqttPort = obj["mqttPort"];
                ssid = obj["ssid"].as<String>().c_str();
                password = obj["password"].as<String>().c_str();
            }
            else
            {
                Serial.println(F("Failed to deserialize file, using default configuration"));
            }
            // Close the file (Curiously, File's destructor doesn't close the file)
            file.close();
        }
    }
}


void Config::save()
{
    const char *filename = CONFIG_FILE;
    // Delete existing file, otherwise the configuration is appended to the file
    Serial.println("Storing configuration to file");
    LittleFS.remove(filename);

    // Open file for writing
    File file = LittleFS.open(filename, "w");
    if (!file)
    {
        Serial.println(F("Failed to create file"));
        return;
    }
    else
    {
        Serial.println(F("File created successfully"));
    }

    // Allocate a temporary JsonDocument
    StaticJsonDocument<256> doc;

    // Set the values in the document
    doc["ssid"].set(ssid);
    doc["password"].set(password);
    doc["mqttServer"].set(mqttServer);
    doc["mqttUsername"].set(mqttUsername);
    doc["mqttPassword"].set(mqttPassword);
    doc["sensorId"].set(sensorId);
    doc["mqttPort"].set(mqttPort);

    // Serialize JSON to file
    if (serializeJson(doc, file) == 0)
    {
        Serial.println(F("Failed to write to file"));
    }

    // Close the file
    file.close();
}