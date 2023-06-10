struct Config
{
  const char* ssid;
  const char* password;
  const char* mqttServer;
  const char* mqttUsername;
  const char* mqttPassword;
  const char* sensorId;
  int mqttPort;
  void load();
  void save();
};