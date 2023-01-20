import { Backend } from "kuzzle";
import { PrometheusPlugin } from "kuzzle-plugin-prometheus";

export type MyApplicationConfig = {
  someValue: string;

  another: {
    value: number;
  };
};

export class MyApplication extends Backend {
  private prometheusPlugin = new PrometheusPlugin();

  get appConfig() {
    return this.config.content.application as MyApplicationConfig;
  }

  constructor() {
    super("my-application");

    this.plugin.use(this.prometheusPlugin);
  }

  async start() {
    await super.start();

    this.log.info("Application started");
  }
}
