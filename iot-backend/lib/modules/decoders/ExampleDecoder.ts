import { JSONObject, KuzzleRequest } from "kuzzle";
import {
  DecodedPayload,
  Decoder,
  MeasuresRegister,
  TemperatureMeasurement,
} from "@kuzzleio/iot-backend";

export class ExampleDecoder extends Decoder {
  constructor(measuresRegister: MeasuresRegister) {
    super("Example", { temperature: "temperature" }, measuresRegister);

    this.payloadsMappings = {
      reference: { type: "keyword" },
    };
  }

  async decode(
    payload: JSONObject,
    request: KuzzleRequest
  ): Promise<DecodedPayload> {
    const reference = payload.reference;

    const temperature: TemperatureMeasurement = {
      measuredAt: Date.now(),
      type: "temperature",
      values: {
        temperature: payload.temperature,
      },
    };

    const decodedPayload: DecodedPayload = {
      [reference]: [temperature],
    };

    return decodedPayload;
  }
}
