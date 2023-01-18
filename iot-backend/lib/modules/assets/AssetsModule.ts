import { DeviceManagerPlugin } from "kuzzle-device-manager";

import { Module } from "../shared";

import { roomAssetDefinition } from "./Room";

export class AssetsModule extends Module {
  register(): void {
    const deviceManager = this.app.plugin.get<DeviceManagerPlugin>("device-manager");

    deviceManager.models.registerAsset(
      "air_quality",
      "Room",
      roomAssetDefinition
    );
  }

  async start(): Promise<void> {
    // nothing there
  }
}
