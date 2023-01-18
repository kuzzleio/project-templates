import { IoTApplication } from "../../IoTApplication";

export abstract class Module {
  protected app: IoTApplication;

  protected get sdk() {
    return this.app.sdk;
  }

  constructor(app: IoTApplication) {
    this.app = app;
  }

  abstract register(): void;

  abstract start(): Promise<void>;
}
