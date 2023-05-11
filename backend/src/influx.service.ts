import { Inject, Injectable } from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { InfluxModuleOptions } from './influx.types';
import { SensorValues } from './mqtt.controller';
import { SensorService } from './sensor/sensor.service';
import { calculateMmax, calculateMoldIndex, getClassParameters } from './utils';

@Injectable()
export class InfluxDbService {
  connection: InfluxDB | null;
  constructor(
    @Inject('INFLUX_DB_OPTIONS')
    private readonly config: InfluxModuleOptions,
    private sensorService: SensorService,
  ) {
    this.connection = null;
    this.connect();
  }

  public connect(): void {
    this.connection = new InfluxDB(this.config);
  }

  async readData(id: string) {
    const query = `from(bucket: "sensors") |> range(start: 0)|> filter(fn: (r) => r._measurement == "myMeasurement" and r.sensor=="sensor/${id}")`;
    const result = await this.connection
      ?.getQueryApi('moldApp')
      .collectRows(query);
    const data = result.map((row: any) => ({
      timestamp: row._time,
      field: row._field,
      value: row._value,
    }));
    const temperature = data.filter((data) => data.field === 'temperature');
    const humidity = data.filter((data) => data.field === 'humidity');
    const lastTemperature = temperature.pop().value;
    const lastHumidity = humidity.pop().value;
    const sensor = this.sensorService.findOne(id);
    const parameters = getClassParameters((await sensor).wallType);
    const mMax = calculateMmax(
      parameters.k2.A,
      parameters.k2.B,
      parameters.k2.C,
      parameters.RHmin,
      lastTemperature,
      90,
    );
    const moldIndex = calculateMoldIndex(
      mMax,
      lastTemperature,
      90,
      parameters.k1.mLowerThan1,
      parameters.k1.mGreaterThan1,
    );
    return {
      temperature: lastTemperature,
      humidity: lastHumidity,
      moldIndex: moldIndex[moldIndex.length - 1],
    };
  }

  async saveData(data: SensorValues, topic: string) {
    const writeAPI = this.connection.getWriteApi('moldApp', 'sensors');
    const point = new Point('myMeasurement')
      .tag('sensor', topic)
      .floatField('temperature', data.temperature)
      .floatField('humidity', data.humidity);
    writeAPI.writePoint(point);
    writeAPI.close().then(() => console.log(point));
  }
}
