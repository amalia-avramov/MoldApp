import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { server } from "../../utils";
import { User } from "../../types";


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
      navigate("/dashboard");
    }
  };

  return { register, errors, onSubmit: handleSubmit(onSubmit) };
}
