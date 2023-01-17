import { Backend } from 'kuzzle';
import { DeviceManagerPlugin } from 'kuzzle-device-manager';

import { classroomAssetDefinition } from './Classroom';

export function registerAssetsModule(app: Backend) {
  const deviceManager = app.plugin.get<DeviceManagerPlugin>('device-manager');

  deviceManager.models.registerAsset(
    'air_quality',
    'Classroom',
    classroomAssetDefinition
  );
}
