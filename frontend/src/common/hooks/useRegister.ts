import { useRegisterMutation } from "@/store/api/registerApi";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

type IFormInput = {
  firstName: string;
  email: string;
  password: string;
};

type Return = {
  onSubmit: SubmitHandler<IFormInput>;
  error: string | null;
};

export const useRegister = (): Return => {
  const navigate = useNavigate();

  const goToAuthPage = () => navigate("/auth");

  const [error, setError] = useState<string | null>(null);

  const [mutation] = useRegisterMutation();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await mutation({
        firstName: data.firstName,
        email: data.email,
        password: data.password,
      }).unwrap();
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
