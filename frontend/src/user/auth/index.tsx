import axios from "axios";
import { FC, useState } from "react";
import { useNavigate } from "react-router";

export const AuthPage: FC = () => {
  const navigate = useNavigate();
  const goToLoginPage = () => navigate("/login");
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      goToLoginPage();
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
      <h1>ログインしているページ</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
};
