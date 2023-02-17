import { Inject, Injectable } from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { InfluxModuleOptions } from './influx.types';

@Injectable()
export class InfluxDbService {
  connection: InfluxDB | null;
  constructor(
    @Inject('INFLUX_DB_OPTIONS')
    private readonly config: InfluxModuleOptions,
  ) {
    this.connection = null;
    this.connect();
  }

  public connect(): void {
    this.connection = new InfluxDB(this.config);
  }

  async readData() {
    const query =
      'from(bucket: "sensors") |> range(start: 0)|> filter(fn: (r) => r._measurement == "myMeasurement")';
    return await this.connection?.getQueryApi('moldApp').collectRows(query);
  }

  async saveData() {
    const writeAPI = this.connection.getWriteApi('moldApp', 'sensors');
    const point = new Point('temp')
      .tag('sensorId', '1')
      .floatField('value', 20.3);
    writeAPI.writePoint(point);
    writeAPI.close().then(() => console.log(point));
  }
}
