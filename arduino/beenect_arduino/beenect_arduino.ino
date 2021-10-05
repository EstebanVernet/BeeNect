#include "WiFi.h"
#include "HTTPClient.h"
#include "DHT.h"

#include "beenect_config.h"

#define DHTPIN 2 
#define DHTTYPE DHT22 
DHT dht(DHTPIN, DHTTYPE);

double humidity, temperature;

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(SSID, SSID_PASSWORD);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) { 
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.println(webhook);
}

void loop() {
  delay(5000);
  // put your main code here, to run repeatedly:
   humidity = dht.readHumidity();
   temperature = dht.readTemperature();

    if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
   }
   
  if( WiFi.status()== WL_CONNECTED ){ 
    
    HTTPClient http;

    http.begin(webhook);

    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    int httpResponseCode = http.POST("humidity=" + String(humidity) + "&temperature=" + String(temperature));
    
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    Serial.println(humidity);
    Serial.println(temperature);
    
    http.end();
  }
}
