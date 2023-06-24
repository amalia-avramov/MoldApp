import { ModuleMetadata } from '@nestjs/common/interfaces';
import { ClientOptions } from '@influxdata/influxdb-client';

export type InfluxModuleOptions = string | ClientOptions;

export interface InfluxModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => Promise<InfluxModuleOptions> | InfluxModuleOptions;
  inject: any[];
}
