import { useForm } from "react-hook-form";
import { Sensor } from "../../types";
import { server } from "../../utils";

export function useRegisterSensor() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<Sensor>();

  const onSubmit = async () => {
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
      console.log("sensor added");
    }
  };
  return { register, getValues, setValue, onSubmit: handleSubmit(onSubmit) };
}
