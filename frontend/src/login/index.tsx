import axios from "axios";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type IFormInput = {
  firstName: String;
  email: String;
  password: String;
};

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const goToHomePage = () => navigate("/");
  const goToRegisterPage = () => navigate("/register");
  const goToAuthPage = () => navigate("/auth");
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await axios.post("/api/auth/login", data);
      console.log("ログイン成功");
      goToAuthPage();
    } catch (error: any) {
      if (error.response) {
        // サーバーからのエラーレスポンス
        const message = error.response.data?.error || "ログインに失敗しました";
        setError(message);
      } else if (error.request) {
        // リクエストは送信されたがレスポンスを受け取れなかった
        setError("サーバーからの応答がありません");
      } else {
        // リクエストの作成時に何か問題が発生
        setError("予期せぬエラーが発生しました");
      }
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
