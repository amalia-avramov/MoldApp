# MoldApp

## MQTT
### Subscriber: docker run -it --network=sensor-network eclipse-mosquitto mosquitto_sub -h mqtt -t test -P amalia -u hta-sensor
### Publisher: docker run -it --rm --network=sensor-network eclipse-mosquitto mosquitto_pub -h mqtt -t test -m '{ "temp": 10.12 }' -P amalia -u hta-sensor