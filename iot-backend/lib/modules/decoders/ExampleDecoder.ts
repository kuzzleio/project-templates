import { JSONObject, KuzzleRequest } from 'kuzzle';
import { DecodedPayload, Decoder } from '@kuzzleio/iot-platform';

export class ExampleDecoder extends Decoder {
  constructor() {
    super('Example', ['temperature']);

    this.payloadsMappings = {};
  }

  async decode(payload: JSONObject, request: KuzzleRequest): Promise<DecodedPayload> {
    const deviceContent: DecodedPayload = {
      reference: payload.reference,
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