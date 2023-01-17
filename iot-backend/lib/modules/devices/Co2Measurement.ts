import { MeasureDefinition } from 'kuzzle-device-manager';

export type Co2Measurement = {
  co2: number;
};

export const co2MeasureDefinition: MeasureDefinition = {
  valuesMappings: { toto: { type: 'float' }, co2: { type: 'float' } },
};
