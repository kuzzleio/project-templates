"use strict";

const _ = require("lodash");
const { After, Before, BeforeAll } = require("cucumber");
const { Kuzzle, WebSocket, Http } = require("kuzzle-sdk");

const testMappings = require("../fixtures/mappings");
const testSecurities = require("../fixtures/securities");
const World = require("./world");

async function truncateCollection(sdk, index, collection, query = {}) {
  await sdk.collection.refresh(index, collection);
  await sdk.document.deleteByQuery(
    index,
    collection,
    { query },
    { lang: "koncorde" }
  );
}

async function resetTenant(sdk, group, name) {
  await sdk
    .query({
      controller: "multi-tenancy/tenant",
      action: "delete",
      group,
      name,
    })
    .catch(() => {});

  await sdk.query({
    controller: "multi-tenancy/tenant",
    action: "create",
    group,
    name,
  });
}

BeforeAll({ timeout: -1 }, async function () {
  const world = new World({});

  if (world.port.toString() === "443") {
    throw new Error(
      `Detecting tests on port 443. Are you targeting a production server? (${world.host})`
    );
  }

  world.sdk = new Kuzzle(new Http(world.host, { port: world.port }));

  console.log(`Connecting to Kuzzle at ${world.host}:${world.port}..`);

  await world.sdk.connect();

  console.log("Loading default securities..");

  await world.sdk.query({
    controller: "admin",
    action: "loadSecurities",
    body: testSecurities,
    refresh: "wait_for",
    onExistingUsers: "overwrite",
  });

  await world.sdk.query({
    controller: "admin",
    action: "loadMappings",
    body: testMappings,
    refresh: "wait_for",
  });

  await Promise.all([]);
});

Before({ timeout: -1 }, async function () {
  this.props.now = Date.now();
  this.props.i = 1;

  this.sdk = new Kuzzle(new WebSocket(this.host, { port: this.port }));

  await this.sdk.connect();
  await this.sdk.auth.login("local", {
    username: "test-admin",
    password: "password",
  });

  await Promise.all([]);
});

After(async function () {
  // Clean values stored by the scenario
  this.props = {};

  if (this.sdk && typeof this.sdk.disconnect === "function") {
    this.sdk.disconnect();
  }
});

// realtime hooks ==============================================================

After({ tags: "@realtime" }, function () {
  if (_.isEmpty(this.props.subscriptions)) {
    throw new Error(
      "@realtime time has been set but no subscriptions have been made."
    );
  }

  const promises = Object.values(this.props.subscriptions).map(
    ({ unsubscribe }) => unsubscribe()
  );

  return Promise.all(promises);
});
