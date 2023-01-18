async function tryQuery (query) {
  try {
    await sdk.query(query);
  }
  catch (error) {
    console.error(error.message);
  }
}

await tryQuery({
  "controller": "multi-tenancy/tenant",
  "action": "create",
  "name": "kuzzle",
  "group": "air_quality"
});

await tryQuery({
  "controller": "device-manager/assets",
  "action": "create",
  "engineId": "tenant-air_quality-kuzzle",
  "body": {
    "model": "Room",
    "reference": "A1"
  }
});

await tryQuery({
  "controller": "device-manager/assets",
  "action": "create",
  "engineId": "tenant-air_quality-kuzzle",
  "body": {
    "model": "Room",
    "reference": "B1"
  }
});

await tryQuery({
  "controller": "device-manager/devices",
  "action": "create",
  "engineId": "tenant-air_quality-kuzzle",
  "body": {
    "model": "AirQualitySensor",
    "reference": "ABC123"
  }
});

await tryQuery({
  "controller": "device-manager/devices",
  "action": "create",
  "engineId": "tenant-air_quality-kuzzle",
  "body": {
    "model": "AirQualitySensor",
    "reference": "ABC456"
  }
});

await tryQuery({
  "controller": "device-manager/devices",
  "action": "linkAsset",
  "engineId": "tenant-air_quality-kuzzle",
  "_id": "AirQualitySensor-ABC123",
  "assetId": "Room-A1",
  "body": {
    "measureNames": [
      { "device": "temperature", "asset": "temperature" },
      { "device": "co2", "asset": "co2" },
      { "device": "humidity", "asset": "humidity" },
      { "device": "illuminance", "asset": "illuminance" }
    ]
  }
})
