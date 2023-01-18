import { Kuzzle } from "kuzzle-sdk";

export async function resetCollection(
  sdk: Kuzzle,
  index: string,
  collection: string
) {
  await sdk.collection.refresh(index, collection);
  await sdk.document.deleteByQuery(index, collection, {});
  await sdk.collection.refresh(index, collection);
}
