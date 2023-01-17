import {
  AssetContent,
  Metadata,
  TemperatureMeasurement,
  AssetModelDefinition,
} from 'kuzzle-device-manager';

import { Co2Measurement } from '../devices/Co2Measurement';

/**
 * Type representing the metadata of a "Classroom" asset.
 *
 * This is optional and can be omitted if you don't want strong typing
 */
export interface ClassroomMetadata extends Metadata {
  floor: number;
  width: number;
}

/**
 * Type representing the measures of a "Classroom" asset.
 *
 * This is optional and can be omitted if you don't want strong typing
 */
export type ClassroomMeasurements = {
  temperatureExt: TemperatureMeasurement;
  co2: Co2Measurement;
};

/**
 * Type meant to be used when manipulating a "Classroom" asset.
 *
 * It is constructed when the types of the asset possible measures and metadata.
 *
 * This is optional and can be omitted if you don't want strong typing
 */
export interface ClassroomAssetContent
  extends AssetContent<ClassroomMeasurements, ClassroomMetadata> {
  model: 'Classroom';
}

/**
 * Asset definition used by the plugin to create associated ressources
 * and updates mappings.
 */
export const classroomAssetDefinition: AssetModelDefinition = {
  measures: [
    {
      name: 'temperatureExt',
      type: 'temperature',
    },
    {
      name: 'co2',
      type: 'co2',
    },
  ],
  metadataMappings: {
    floor: { type: 'integer' },
    width: { type: 'float' },
  },
  defaultMetadata: {},
};
