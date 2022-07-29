import { Backend } from 'kuzzle';
import { registerKIoTP } from '@kuzzleio/iot-backend';

export type MyIoTApplicationConfig = {
  someValue: string;

  another: {
    value: number;
  }
};

export class MyIoTApplication extends Backend {
  get appConfig () {
    return this.config.content.application as MyIoTApplicationConfig;
  }

  constructor () {
    super('my-iot-application');

    registerKIoTP(this);
  }

  async start () {
    await super.start();

    this.log.info('Application started');
  }
}
