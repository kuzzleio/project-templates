import { JSONObject, KuzzleRequest } from 'kuzzle';
import { DecodedPayload, Decoder } from '@kuzzleio/iot-platform';

export class DefaultDecoder extends Decoder {
  constructor() {
    super('Default', ['temperature']);

    this.payloadsMappings = {};
  }

  async decode(payload: JSONObject, request: KuzzleRequest): Promise<DecodedPayload> {
    const deviceContent: DecodedPayload = {
      reference: 'default',
      measures: {
        channel: {
          measuredAt: Date.now(),
          values: {
            temperature: 21,
          }
        }
      }
    };

    return deviceContent;
  }
}