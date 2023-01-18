function randomNum (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateAirQualitySensorHistory (deviceId, days) {
  let timestamp = Date.now() - 1000 * 60 * 60 * 24 * days; // start X days ago

  console.log(`Generate ${days} days of air quality sensor history for "${deviceId}"`);

  for (let i = 0; i <= days * 24; i++) {
    await  sdk.query({
      controller: 'device-manager/payloads',
      action: 'air-quality-sensor',
      body: {
        deviceId,
        temperature: randomNum(15, 30),
        humidity: randomNum(50, 80),
        co2: randomNum(200, 800),
        illuminance: randomNum(6000, 9000),
        timestamp
      }
    });

    timestamp += 1000 * 60 * 60;
  }

  console.log(`${days} days generated for "${deviceId}"`);
}

/**
 * Receive measures
 */

await generateAirQualitySensorHistory('ABC123', 7);
await generateAirQualitySensorHistory('ABC456', 7);
