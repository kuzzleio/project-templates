import { ApplicationBuilder, DeviceManagerPlugin } from '@kuzzleio/iot-backend';

import { MyIoTApplication } from '../MyIoTApplication';
import { ExampleDecoder } from '../modules/decoders';

export function registerCommons(app: MyIoTApplication) {
  const deviceManager = app.plugin.get('device-manager') as DeviceManagerPlugin;

  ApplicationBuilder.commons(commons => {
    commons.decoder.register(new ExampleDecoder(deviceManager.measures));
  });
}