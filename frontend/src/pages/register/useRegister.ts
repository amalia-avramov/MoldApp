import { useForm } from "react-hook-form";
import { server } from "../../utils";
import { User } from "../../types";
import { useState } from "react";

// ----------------------------------------------------
// Register hook
// ----------------------------------------------------
export function useRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<User>({ mode: "onChange" });
  
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async () => {
    const postData = getValues();
    const result = await fetch(`${server}/users`, {
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
      setShowModal(true);
    }
  };

  return { register, showModal, errors, onSubmit: handleSubmit(onSubmit) };
}
