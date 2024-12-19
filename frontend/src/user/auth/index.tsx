import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { useLogoutMutation } from "../../store/api/authApi";

export const AuthPage: FC = () => {
  const navigate = useNavigate();
  const goToLoginPage = () => navigate("/login");
  const [error, setError] = useState<string | null>(null);

  const [mutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await mutation().unwrap();
      goToLoginPage();
    } catch (error: any) {
      setError(error?.data?.error || "予期せぬエラーが発生しました");
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
