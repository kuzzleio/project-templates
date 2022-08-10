import { Backend } from "kuzzle";
import { registerKIoTP } from "@kuzzleio/iot-backend";

import { registerTenantExamplePublicLightning } from "./application-builder/tenant-example-public-lightning";
import { registerCommons } from "./application-builder/commons";

export type ExampleApplicationConfig = {
  someValue: string;
};

export class ExampleApplication extends Backend {
  get appConfig() {
    return this.config.content.application as ExampleApplicationConfig;
  }

  constructor() {
    super("my-iot-application");

    registerKIoTP(this);

    // Register ressources defined with ApplicationBuilder
    registerCommons(this);
    registerTenantExamplePublicLightning(this);
  }

  async start() {
    await super.start();

    this.log.info("Application started");
  }
}
