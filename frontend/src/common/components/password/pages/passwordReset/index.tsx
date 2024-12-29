import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { usePasswordResetMutation } from "../../../../../store/api/authApi";
import { ApiErrorResponse, errors } from "../../../../constants/errors";

type IFormInput = {
  newPassword: string;
  token: string;
};

export const PasswordResetPage: FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [mutation] = usePasswordResetMutation();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutation(data).unwrap();
    } catch (err) {
      const apiError = err as ApiErrorResponse;
      const errorMessage =
        errors[apiError?.data?.message] || "予期せぬエラーが発生しました";
      setError(errorMessage);
    }
  });

  return (
    <>
      <p>{error}</p>
      <h1>パスワードリセット</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="新しいパスワード"
          {...register("newPassword")}
        />
        <button type="submit">送信</button>
      </form>
    </>
  );
};
