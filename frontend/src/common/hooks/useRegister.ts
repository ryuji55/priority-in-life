import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../../store/api/registerApi";
import { ApiErrorResponse, getErrorMessage } from "../constants/errors";
import { ROUTES } from "../constants/route";

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

  const goToAuthPage = () => navigate(ROUTES.AUTH.ROOT);

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
