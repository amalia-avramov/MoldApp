import { DynamicModule, Module, Global } from '@nestjs/common';
import { InfluxDbService } from './influx.service';
import { InfluxModuleAsyncOptions, InfluxModuleOptions } from './influx.types';
import { SensorModule } from '../sensor/sensor.module';

@Global()
@Module({})
export class InfluxDbModule {
  static forRoot(options: InfluxModuleOptions): DynamicModule {
    return {
      module: InfluxDbModule,
      providers: [
        {
          provide: 'INFLUX_DB_OPTIONS',
          useValue: options,
        },
        InfluxDbService,
      ],
      imports: [SensorModule],
      exports: [InfluxDbService],
    };
  }
  static forRootAsync(options: InfluxModuleAsyncOptions): DynamicModule {
    return {
      module: InfluxDbModule,
      providers: [
        {
          provide: 'INFLUX_DB_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        InfluxDbService,
      ],
      imports: [SensorModule, ...(options.imports || [])],
      exports: [InfluxDbService],
    };
  }
}
