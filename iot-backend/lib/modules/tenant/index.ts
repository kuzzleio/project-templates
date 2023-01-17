import { ProfileTenantAdmin, ProfileTenantReader } from "@kuzzleio/iot-backend";
import { MultiTenancyPlugin } from '@kuzzleio/plugin-multi-tenancy';
import { Backend } from 'kuzzle';

export function registerTenantsModule(app: Backend) {
  const multiTenancy = app.plugin.get<MultiTenancyPlugin>('multi-tenancy');

  multiTenancy.registerProfilesTemplates('air_quality', {
    [ProfileTenantAdmin.name]: ProfileTenantAdmin.definition,
    [ProfileTenantReader.name]: ProfileTenantReader.definition,
  });
}
