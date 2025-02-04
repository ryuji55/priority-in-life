import { useState } from "react";
import { useNavigate } from "react-router";
import { useLogoutMutation } from "../../store/api/authApi";
import { ApiErrorResponse, getErrorMessage } from "../constants/errors";
import { ROUTES } from "../constants/route";

type Return = {
  handleLogout: () => Promise<void>;
  error: string | null;
};

export const useLogout = (): Return => {
  const navigate = useNavigate();
  const goToLoginPage = () => navigate(ROUTES.LOGIN);
  const [error, setError] = useState<string | null>(null);

  const [mutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await mutation().unwrap();
      goToLoginPage();
    } catch (err) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError?.data?.message));
    }
  };

  return {
    handleLogout,
    error,
  };
};
