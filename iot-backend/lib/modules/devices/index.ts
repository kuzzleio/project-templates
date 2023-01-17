import { Backend } from 'kuzzle';
import { DeviceManagerPlugin } from 'kuzzle-device-manager';

import { AbeewayCo2Decoder } from './AbeewayCo2Decoder';
import { co2MeasureDefinition } from './Co2Measurement';

export function registerDevicesModule(app: Backend) {
  const deviceManager = app.plugin.get<DeviceManagerPlugin>('device-manager');

  deviceManager.models.registerMeasure('co2', co2MeasureDefinition);

  deviceManager.models.registerDevice('AbeewayCo2', {
    decoder: new AbeewayCo2Decoder(),
  });
}
