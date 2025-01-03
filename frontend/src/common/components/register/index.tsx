import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRegister } from "../../hooks/useRegister";
import { ROUTES } from "../../constants/route";

type IFormInput = {
  firstName: string;
  email: string;
  password: string;
};

export const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const goToHomePage = () => navigate(ROUTES.HOME);
  const goToLoginPage = () => navigate(ROUTES.LOGIN);

  const { register, handleSubmit } = useForm<IFormInput>();

  const { onSubmit, error } = useRegister();

  return (
    <>
      {error && <p>{error}</p>}
      <h1>登録ページ</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          名前
          <input {...register("firstName")} />
        </label>
        <label>
          メールアドレス
          <input {...register("email")} />
        </label>
        <label>
          パスワード
          <input {...register("password")} />
        </label>
        <button type="submit">送信</button>
      </form>
      <button onClick={goToHomePage}>ホームページ</button>
      <button onClick={goToLoginPage}>ログインページ</button>
    </>
  );
};
