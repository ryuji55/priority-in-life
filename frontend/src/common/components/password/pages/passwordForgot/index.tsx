import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { usePasswordForgotMutation } from "../../../../../store/api/authApi";
import {
  ApiErrorResponse,
  getErrorMessage,
} from "../../../../constants/errors";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/route";

type IFormInput = {
  email: string;
};

export const PasswordForgotPage: FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [mutation] = usePasswordForgotMutation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const goToLoginPage = () => navigate(ROUTES.LOGIN);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutation(data).unwrap();
    } catch (err) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError?.data?.message));
    }
  });

  return (
    <>
      <p>{error}</p>
      <h1>パスワード変更リクエスト</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="メールアドレス"
          {...register("email")}
        />
        <button type="submit">送信</button>
      </form>
      <button onClick={goToLoginPage}>ログインページ</button>
    </>
  );
};
