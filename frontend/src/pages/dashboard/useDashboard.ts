import { server } from "../../utils";
import { Room, Sensor } from "../../types";
import useSWR from "swr";

export function useDashboard() {
  const userId = localStorage.getItem("loggedUserId");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: sensors, isLoading } = useSWR<Sensor[]>(
    `${server}/sensors/user/${userId}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  const { data: rooms } = useSWR<Room[]>(
    `${server}/sensors/rooms/${userId}`,
    fetcher,
    { refreshInterval: 1000 }
  );
  return { sensors: sensors ?? [], rooms: rooms ?? [], isLoading };
}
