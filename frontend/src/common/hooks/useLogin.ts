import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../store/api/authApi";
import { SubmitHandler } from "react-hook-form";

type Return = {
  onSubmit: SubmitHandler<IFormInput>;
  error: string | null;
};

type IFormInput = {
  firstName: string;
  email: string;
  password: string;
};

export const useLogin = (): Return => {
  const navigate = useNavigate();
  const goToAuthPage = () => navigate("/auth");
  const [error, setError] = useState<string | null>(null);

  const [mutation] = useLoginMutation();

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    try {
      await mutation({ email: email, password: password }).unwrap();
      console.log("ログイン成功");
      goToAuthPage();
    } catch (error: any) {
      setError(error?.data?.error || "予期せぬエラーが発生しました");
    }
  };

  return {
    onSubmit,
    error,
  };
};
