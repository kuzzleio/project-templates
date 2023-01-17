import { JSONObject } from 'kuzzle';
import { DecodedPayload, Decoder } from 'kuzzle-device-manager';

import { Co2Measurement } from './Co2Measurement';

export class AbeewayCo2Decoder extends Decoder {
  public measures = [{ name: 'co2', type: 'co2' }] as const;

  constructor() {
    super();

    this.action = 'abeeway-co2';

    this.payloadsMappings = {
      deviceEUI: { type: 'keyword' },
    };
  }

  async decode(
    decodedPayload: DecodedPayload<AbeewayCo2Decoder>,
    payload: JSONObject
  ): Promise<DecodedPayload<Decoder>> {
    decodedPayload.addMeasurement<Co2Measurement>(payload.deviceEUI, 'co2', {
      measuredAt: payload.measuredAt || Date.now(),
      type: 'co2',
      values: {
        co2: payload.co2,
      },
    });

    return decodedPayload;
  }
}
