import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

type LoginUser = {
  user: User;
  accessToken: string;
};

export function useLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<User>({ mode: "onChange" });
  const [loginUser, setLoginUser] = useState<LoginUser>();
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    setAlert(false);
    const postData = getValues();
    const result = await fetch("http://localhost:3000/auth/login", {
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
      const data = await result.json();
      setLoginUser(data);
      navigate("/dashboard");
    }
  };

  return {
    alert,
    errors,
    loginUser: loginUser,
    register,
    onSubmit: handleSubmit(onSubmit),
  };
}
