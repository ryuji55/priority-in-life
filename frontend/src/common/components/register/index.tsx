import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRegister } from "../../hooks/useRegister";

type IFormInput = {
  firstName: string;
  email: string;
  password: string;
};

export const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const goToHomePage = () => navigate("/");
  const goToLoginPage = () => navigate("/login");

  const { register, handleSubmit } = useForm<IFormInput>();

  const { onSubmit, error } = useRegister();

  return (
    <>
      {error && <p>{error}</p>}
      <h1>登録ページ</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>名前</label>
        <input {...register("firstName")} />
        <label>メールアドレス</label>
        <input {...register("email")} />
        <label>パスワード</label>
        <input {...register("password")} />
        <input type="submit" />
      </form>
      <button onClick={goToHomePage}>ホームページ</button>
      <button onClick={goToLoginPage}>ログインページ</button>
    </>
  );
};
