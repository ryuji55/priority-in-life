import { FC } from "react";
import { useForm } from "react-hook-form";

type IFormInput = {
  email: string;
};

export const PasswordResetPage: FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <h1>パスワードリセット</h1>
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
