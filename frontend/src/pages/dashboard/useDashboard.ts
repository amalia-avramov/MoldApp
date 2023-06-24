import { server } from "../../utils";
import { Room, Sensor } from "../../types";
import useSWR from "swr";

export function useDashboard() {
  const userId = localStorage.getItem("loggedUserId");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: sensors, isLoading, mutate: refresh } = useSWR<Sensor[]>(`${server}/sensors/user/${userId}`, fetcher);

  const { data: rooms, mutate: refreshRooms } = useSWR<Room[]>(`${server}/sensors/rooms/${userId}`, fetcher);

  const handleToggleChange = async (sensor: Sensor) => {
    const updatedSensor = { ...sensor, isActive: !sensor.isActive };
    const result = await fetch(`${server}/sensors/${sensor._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "token-value",
      },
      body: JSON.stringify(updatedSensor),
    });
    if (!result.ok) {
      console.log(result);
    } else {
      refresh();
      refreshRooms();
    }
  };

  return {
    sensors: sensors ?? [],
    rooms: rooms ?? [],
    isLoading,
    onToggleChange: handleToggleChange,
    refresh,
    refreshRooms,
  };
}
