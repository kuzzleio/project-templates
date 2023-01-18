import {
  DecodedPayload,
  Decoder,
  HumidityMeasurement,
  TemperatureMeasurement,
} from "@kuzzleio/iot-backend";
import { JSONObject } from "kuzzle";
import { has } from "lodash";

import { CO2Measurement } from "./CO2Measurement";

export class AirQualitySensorDecoder extends Decoder {
  public measures = [
    { name: "temperature", type: "temperature" },
    { name: "humidity", type: "humidity" },
    { name: "co2", type: "co2" },
  ] as const;

  constructor() {
    super();

    this.action = "air-quality-sensor";

    this.payloadsMappings = {
      deviceId: { type: "keyword" },
    };
  }

  async validate(payload: JSONObject): Promise<boolean> {
    this.ensureProperties(payload, ["deviceId"]);

    const properties = ["temperature", "humidity", "co2"];

    return properties.every((property) => has(payload, property));
  }

  async decode(
    decodedPayload: DecodedPayload<AirQualitySensorDecoder>,
    payload: JSONObject
  ): Promise<DecodedPayload<Decoder>> {
    const deviceId = payload.deviceId;

    const measuredAt = payload.timestamp || Date.now();

    decodedPayload.addMeasurement<TemperatureMeasurement>(
      deviceId,
      "temperature",
      {
        measuredAt,
        type: "temperature",
        values: {
          temperature: payload.temperature,
        },
      }
    );

    decodedPayload.addMeasurement<HumidityMeasurement>(deviceId, "humidity", {
      measuredAt,
      type: "humidity",
      values: {
        humidity: payload.humidity,
      },
    });

    decodedPayload.addMeasurement<CO2Measurement>(deviceId, "co2", {
      measuredAt,
      type: "co2",
      values: {
        co2: payload.co2,
      },
    });

    return decodedPayload;
  }
}
