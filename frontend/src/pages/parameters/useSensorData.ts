import { server } from "../../utils";
import { SensorData } from "../../types";
import useSWR from "swr";

export function useSensorData(sensorId: string) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: sensorData } = useSWR<SensorData>(`${server}/sensor/${sensorId}/data`, fetcher);

  return { sensorData };
}
