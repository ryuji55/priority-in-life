import { FC } from "react";
import { usePasswordReset } from "../../../hooks/usePasswordReset";
import { useForm } from "react-hook-form";

type IFormInput = {
  newPassword: string;
};

export const PasswordResetPage: FC = () => {
  const { onSubmit, error } = usePasswordReset();
  const { register, handleSubmit } = useForm<IFormInput>();

  return (
    <>
      <p>{error}</p>
      <h1>パスワードリセット</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>新しいパスワード</label>
        <input {...register("newPassword")} />
        <button type="submit">送信</button>
      </form>
    </>
  );
};
