import { instantiateKuzzleSDK } from 'vue-plugin-kuzzle';
import { Observer } from 'kuzzle-sdk';

import config from '../config';

export const kuzzle = instantiateKuzzleSDK(config.backends, {});
export const observer = new Observer(kuzzle);
