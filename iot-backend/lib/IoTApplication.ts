import { registerKIoTP } from "@kuzzleio/iot-backend";
import { Backend } from "kuzzle";

import { AssetsModule } from "./modules/assets";
import { DevicesModule } from "./modules/devices";
import { PermissionsModule } from "./modules/permissions";
import { Module } from "./modules/shared";

export type IoTApplicationConfig = {
  someValue: string;
};

export class IoTApplication extends Backend {
  private modules: Module[] = [];

  get appConfig() {
    return this.config.content.application as IoTApplicationConfig;
  }

  constructor() {
    super("iot-application");

    this.modules.push(new AssetsModule(this));
    this.modules.push(new DevicesModule(this));
    this.modules.push(new PermissionsModule(this));

    registerKIoTP(this);

    for (const module of this.modules) {
      module.register();
    }
  }

  async start() {
    await super.start();

    this.log.info("Application started");

    for (const module of this.modules) {
      await module.start();
    }
  }
}
