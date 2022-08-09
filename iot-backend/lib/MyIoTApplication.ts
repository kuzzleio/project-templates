import { Backend } from "kuzzle";
import { registerKIoTP } from "@kuzzleio/iot-backend";

import { registerTenantDefault } from "./application-builder/tenant-default";
import { registerCommons } from "./application-builder/commons";

export type MyIoTApplicationConfig = {
  someValue: string;
};

export class MyIoTApplication extends Backend {
  get appConfig() {
    return this.config.content.application as MyIoTApplicationConfig;
  }

  constructor() {
    super("my-iot-application");

    registerKIoTP(this);

    // Register ressources defined with ApplicationBuilder
    registerCommons(this);
    registerTenantDefault(this);
  }

  async start() {
    await super.start();

    this.log.info("Application started");
  }
}
