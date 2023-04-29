import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
  email: string;
  password: string;
};

export function useRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<User>({ mode: "onChange" });
  const navigate = useNavigate();

  const onSubmit = async () => {
    const postData = getValues();
    console.log(postData);
    const result = await fetch("http://localhost:3000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "token-value",
      },
      body: JSON.stringify(postData),
    });
    if (result.ok) {
      console.log(result);
    } else {
      navigate("/dashboard");
    }
  };

  return { register, errors, onSubmit: handleSubmit(onSubmit) };
}
