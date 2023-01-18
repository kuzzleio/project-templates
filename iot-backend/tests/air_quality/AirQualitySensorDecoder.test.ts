import { DeviceContent } from "kuzzle-device-manager";
import should from "should";

import { resetCollection } from "../hooks/collections";
import { getSdk } from "../hooks/getSdk";

jest.setTimeout(10000);

describe("AirQualitySensorDecoder", () => {
  const sdk = getSdk();

  beforeAll(async () => {
    await sdk.connect();
  });

  beforeEach(async () => {
    await resetCollection(sdk, "platform", "devices");
  });

  afterAll(async () => {
    sdk.disconnect();
  });

  it("should decode position and battery measures", async () => {
    await sdk.query({
      controller: "device-manager/payloads",
      action: "air-quality-sensor",
      body: {
        deviceId: "unlinked",
        temperature: 27,
        humidity: 69,
        co2: 650,
        timestamp: 1673959649017,
      },
    });

    const device = await sdk.document.get<DeviceContent>(
      "platform",
      "devices",
      "AirQualitySensor-unlinked"
    );

    should(device._source.measures.temperature).match({
      measuredAt: 1673959649017,
      values: {
        temperature: 27,
      },
    });

    should(device._source.measures.humidity).match({
      measuredAt: 1673959649017,
      values: {
        humidity: 69,
      },
    });

    should(device._source.measures.co2).match({
      measuredAt: 1673959649017,
      values: {
        co2: 650,
      },
    });
  });
});
