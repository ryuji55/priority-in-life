import { FC } from "react";
import { useNavigate } from "react-router";

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const goToHomePage = () => navigate("/");
  const goToRegisterPage = () => navigate("/register");
  return (
    <>
      <h1>ログインページ</h1>
      <button onClick={goToHomePage}>ホームページ</button>
      <button onClick={goToRegisterPage}>登録ページ</button>
    </>
  );
};
