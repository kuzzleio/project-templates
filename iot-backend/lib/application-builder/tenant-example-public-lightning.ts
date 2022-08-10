import { ApplicationBuilder } from "@kuzzleio/iot-backend";

import { ExampleApplication } from "../ExampleApplication";

export function registerTenantExamplePublicLightning(app: ExampleApplication) {
  ApplicationBuilder.tenantGroup("example_public_lightning", (tenantGroup) => {
    tenantGroup.profile.register("admin", {
      policies: [{ roleId: "admin" }],
    });
  });
}
