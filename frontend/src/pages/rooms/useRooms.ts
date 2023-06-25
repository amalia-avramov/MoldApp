import useSWR from "swr";
import { server } from "../../utils";
import { Room } from "../../types";

// ----------------------------------------------------
// Room hook
// ----------------------------------------------------
export function useRoom() {
  const userId = localStorage.getItem("loggedUserId");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: rooms, isLoading, mutate } = useSWR<Room[]>(`${server}/sensors/rooms/${userId}`, fetcher);

  const onDelete = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${server}/sensors/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        mutate();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { rooms: rooms ?? [], isLoading, onDelete, refresh: mutate };
}
