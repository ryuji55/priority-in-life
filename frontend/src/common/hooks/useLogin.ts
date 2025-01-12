import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../store/api/authApi";
import { SubmitHandler } from "react-hook-form";
import { ApiErrorResponse, getErrorMessage } from "../constants/errors";
import { ROUTES } from "../constants/route";

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
  const goToAuthPage = () => navigate(ROUTES.AUTH.ROOT);
  const [error, setError] = useState<string | null>(null);

  const [mutation] = useLoginMutation();

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    try {
      await mutation({ email: email, password: password }).unwrap();
      console.log("ログイン成功");
      goToAuthPage();
    } catch (err) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError?.data?.message));
    }
  };

  return {
    onSubmit,
    error,
  };
};
