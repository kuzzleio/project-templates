import { Backend } from "kuzzle";

export type MyApplicationConfig = {
  someValue: string;

  another: {
    value: number;
  };
};

export class MyApplication extends Backend {
  get appConfig() {
    return this.config.content.application as MyApplicationConfig;
  }

  constructor() {
    super("my-application");
  }

  async start() {
    await super.start();

    this.log.info("Application started");
  }
}
