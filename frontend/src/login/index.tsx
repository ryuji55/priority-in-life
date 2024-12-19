import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../store/api/authApi";

type IFormInput = {
  firstName: string;
  email: string;
  password: string;
};

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const goToHomePage = () => navigate("/");
  const goToRegisterPage = () => navigate("/register");
  const goToAuthPage = () => navigate("/auth");
  const [error, setError] = useState<string | null>(null);

  const [mutation] = useLoginMutation();

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await mutation({ email: data.email, password: data.password }).unwrap();
      console.log("ログイン成功");
      goToAuthPage();
    } catch (error: any) {
      setError(error?.data?.error || "予期せぬエラーが発生しました");
    }
  };

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
    </>
  );
};
