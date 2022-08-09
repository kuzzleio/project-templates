import { ApplicationBuilder } from "@kuzzleio/iot-backend";

import { MyIoTApplication } from "../MyIoTApplication";

export function registerTenantDefault(app: MyIoTApplication) {
  ApplicationBuilder.tenantGroup("default", (tenantGroup) => {
    tenantGroup.profile.register("admin", {
      policies: [{ roleId: "admin" }],
    });
  });
}
