import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { server } from "../../utils";
import { LoginUser, User } from "../../types";

export function useLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<User>({ mode: "onChange" });
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    setAlert(false);
    const postData = getValues();
    const result = await fetch(`${server}/auth/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "token-value",
      },
      body: JSON.stringify(postData),
    });
    if (!result.ok) {
      setAlert(true);
    } else {
      const data: LoginUser = await result.json();
      console.log(data.user._id)
      localStorage.setItem('loggedUserId', data.user?._id);
      console.log(data);
      navigate("/dashboard");
    }
  };

  return {
    alert,
    errors,
    register,
    onSubmit: handleSubmit(onSubmit),
  };
}
