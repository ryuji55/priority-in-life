import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useLogin } from "../../hooks/useLogin";
import { ROUTES } from "../../constants/route";

type IFormInput = {
  firstName: string;
  email: string;
  password: string;
};

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const goToHomePage = () => navigate(ROUTES.HOME);
  const goToRegisterPage = () => navigate(ROUTES.REGISTER);
  const goToPasswordForgotPage = () => navigate(ROUTES.PASSWORD.FORGOT);

  const { onSubmit, error } = useLogin();

  const { register, handleSubmit } = useForm<IFormInput>();

  return (
    <>
      <p>{error}</p>
      <h1>ログインページ</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>メールアドレス</label>
        <input {...register("email")} />
        <label>パスワード</label>
        <input {...register("password")} />
        <input type="submit" />
      </form>
      <button onClick={goToHomePage}>ホームページ</button>
      <button onClick={goToRegisterPage}>登録ページ</button>
      <button onClick={goToPasswordForgotPage}>パスワードリセットページ</button>
    </>
  );
};
