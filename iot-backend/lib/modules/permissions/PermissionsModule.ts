import { ProfileTenantAdmin, ProfileTenantReader } from "@kuzzleio/iot-backend";
import { MultiTenancyPlugin } from "@kuzzleio/plugin-multi-tenancy";

import { Module } from "../shared";

export class PermissionsModule extends Module {
  register(): void {
    const multiTenancy = this.app.plugin.get<MultiTenancyPlugin>("multi-tenancy");

    multiTenancy.registerProfilesTemplates("air_quality", {
      [ProfileTenantAdmin.name]: ProfileTenantAdmin.definition,
      [ProfileTenantReader.name]: ProfileTenantReader.definition,
    });
    }

  async start(): Promise<void> {
    // nothing there
  }
}
