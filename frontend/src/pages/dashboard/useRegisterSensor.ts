import { useForm } from "react-hook-form";
import { Sensor } from "../../types";
import { server } from "../../utils";
import ObjectId from "bson-objectid";

// ----------------------------------------------------
// Register sensor hook
// ----------------------------------------------------
export function useRegisterSensor(refresh?: () => void) {
  const { register, handleSubmit, getValues, setValue } = useForm<Sensor>();

  const onSubmit = async () => {
    const id = new ObjectId().toHexString();
    setValue("_id", id);
    setValue("isActive", true);
    setValue("userId", localStorage.getItem("loggedUserId") ?? "");
    const postData = getValues();
    const result = await fetch(`${server}/sensors`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "token-value",
      },
      body: JSON.stringify(postData),
    });
    if (!result.ok) {
      console.log(result);
    } else {
      if (refresh) refresh();
    }
  };
  return { register, getValues, setValue, onSubmit: handleSubmit(onSubmit) };
}
