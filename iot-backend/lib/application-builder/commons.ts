import { ApplicationBuilder, DeviceManagerPlugin } from '@kuzzleio/iot-backend';

import { ExampleApplication } from '../ExampleApplication';
import { ExampleDecoder } from '../modules/decoders';

export function registerCommons(app: ExampleApplication) {
  const deviceManager = app.plugin.get('device-manager') as DeviceManagerPlugin;

  ApplicationBuilder.commons(commons => {
    commons.decoder.register(new ExampleDecoder(deviceManager.measures));
  });
}