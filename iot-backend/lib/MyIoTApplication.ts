import { Backend } from 'kuzzle';
import { registerKIoTP } from '@kuzzleio/iot-backend';

import { registerDefaultTenant } from './iot/tenants/default';
import { registerCommonsRessources } from './iot/commons';

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
    registerCommonsRessources(this);
    registerDefaultTenant(this);
  }

  async start () {
    await super.start();

    this.log.info('Application started');
  }
}
