import useSWR from "swr";
import { server } from "../../utils";
import { NotificationDTO } from "../../types";

export function useNotifications() {
  const userId = localStorage.getItem("loggedUserId");
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, mutate: refresh } = useSWR<NotificationDTO[]>(`${server}/notifications/${userId}`, fetcher);

  const handleViewButton = async (notification: NotificationDTO) => {
    const updatedNotification = { ...notification, viewed: true };
    const result = await fetch(`${server}/notifications/${notification._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "token-value",
      },
      body: JSON.stringify(updatedNotification),
    });
    if (!result.ok) {
      console.log(result);
    } else {
      refresh();
    }
  };

  const handleDeleteNotification = async (id: string) => {
    const result = await fetch(`${server}/notifications/${id}`, {
      method: "delete",
    });
    if (!result.ok) {
      console.log(result);
    } else {
      refresh();
    }
  };

  const handleClearAllButton = async () => {
    const result = await fetch(`${server}/notifications/`, {
      method: "delete",
    });
    if (!result.ok) {
      console.log(result);
    } else {
      refresh();
    }
  };

  return { data, handleViewButton, handleDeleteNotification, handleClearAllButton };
}
