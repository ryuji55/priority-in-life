import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

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

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("登録が完了しました");
        goToAuthPage();
      } else {
        alert("登録に失敗しました");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
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
