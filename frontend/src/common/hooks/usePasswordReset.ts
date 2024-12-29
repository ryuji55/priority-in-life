import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { usePasswordResetMutation } from "../../store/api/authApi";
import { SubmitHandler } from "react-hook-form";
import { ApiErrorResponse, getErrorMessage } from "../constants/errors";

type IFormInput = {
  newPassword: string;
};

type Return = {
  onSubmit: SubmitHandler<IFormInput>;
  error: string | null;
};

export const usePasswordReset = (): Return => {
  const token = useParams<{ token: string }>().token;
  if (!token) {
    throw new Error("token not found");
  }
  const navigate = useNavigate();
  const goToLoginPage = () => navigate("/login");
  const [error, setError] = useState<string | null>(null);

  const [mutation] = usePasswordResetMutation();

  const onSubmit: SubmitHandler<IFormInput> = async ({ newPassword }) => {
    try {
      await mutation({ token, newPassword }).unwrap();
      goToLoginPage();
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
