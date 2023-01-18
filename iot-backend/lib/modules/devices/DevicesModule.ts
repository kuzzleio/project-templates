import { DeviceManagerPlugin } from "kuzzle-device-manager";

import { Module } from "../shared";

import { AirQualitySensorDecoder } from "./AirQualitySensorDecoder";
import { co2MeasureDefinition } from "./CO2Measurement";

export class DevicesModule extends Module {
  register(): void {
    const deviceManager = this.app.plugin.get<DeviceManagerPlugin>("device-manager");

    deviceManager.models.registerMeasure("co2", co2MeasureDefinition);

    deviceManager.models.registerDevice("AirQualitySensor", {
      decoder: new AirQualitySensorDecoder(),
    });
  }

  async start(): Promise<void> {
    // nothing there
  }
}
