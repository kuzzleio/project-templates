await sdk.query({
  "controller": "device-manager/payloads",
  "action": "air-quality-sensor",
  "body": {
    "deviceId": "ABC123",
    "temperature": 21,
    "humidity": 65,
    "co2": 456,
    "illuminance": 1982
  }
});