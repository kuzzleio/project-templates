import { registerKIoTP } from "@kuzzleio/iot-backend";
import { Backend, KuzzleRequest } from 'kuzzle';

import { registerAssetsModule } from './modules/assets';
import { registerDevicesModule } from './modules/devices';
import { registerTenantsModule } from './modules/tenant';

export class ExampleApplication extends Backend {
  constructor() {
    super('iot-backend');

    /**
     * Easier debugging in development
     */
    if (process.env.NODE_ENV !== 'production') {
      this.hook.register('request:onError', async (request: KuzzleRequest) => {
        this.log.error(request.error);
      });

      this.config.content.plugins['kuzzle-plugin-logger'].services.stdout.level =
        'debug';
    }

    /**
     * Register KIoTP application
     */
    registerKIoTP(this);

    /**
     * Register custom this modules
     */
    registerTenantsModule(this);
    registerDevicesModule(this);
    registerAssetsModule(this);
  }
}