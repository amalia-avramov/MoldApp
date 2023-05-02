import { useEffect, useState } from "react";
import { server } from "../../utils";
import { Sensor } from "../../types";

export function useDashboard() {
  const userId = localStorage.getItem("loggedUserId");
  const [sensors, setSensors] = useState<Sensor[]>([]);

  useEffect(() => {
    fetch(`${server}/sensors/user/${userId}`)
      .then((res) => res.json())
      .then((data: Sensor[]) => {
        console.log(data);
        setSensors(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return {sensors}
}
