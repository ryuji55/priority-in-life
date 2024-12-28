import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { usePasswordForgotMutation } from "../../../../store/api/authApi";

type IFormInput = {
  email: string;
};

export const PasswordForgotPage: FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [mutation] = usePasswordForgotMutation();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutation(data).unwrap();
    } catch (error: any) {
      setError(error?.data?.error || "予期せぬエラーが発生しました");
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
    </>
  );
};
