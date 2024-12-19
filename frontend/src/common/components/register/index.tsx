import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../../../store/api/registerApi";

type IFormInput = {
  firstName: string;
  email: string;
  password: string;
};

export const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const goToHomePage = () => navigate("/");
  const goToLoginPage = () => navigate("/login");
  const goToAuthPage = () => navigate("/auth");

  const [error, setError] = useState<string | null>(null);

  const [mutation] = useRegisterMutation();

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await mutation({
        firstName: data.firstName,
        email: data.email,
        password: data.password,
      }).unwrap();
      goToAuthPage();
    } catch (error: any) {
      setError(error?.data?.error || "予期せぬエラーが発生しました");
    }
  };
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
