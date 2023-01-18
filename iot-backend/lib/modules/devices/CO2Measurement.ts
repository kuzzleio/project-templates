import { MeasureDefinition } from "@kuzzleio/iot-backend";

export type CO2Measurement = {
  co2: number;
};

export const co2MeasureDefinition: MeasureDefinition = {
  valuesMappings: { co2: { type: "float" } },
};
