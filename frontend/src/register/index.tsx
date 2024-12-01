import { FC } from "react";
import { useNavigate } from "react-router";

export const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const goToHomePage = () => navigate("/");
  const goToLoginPage = () => navigate("/login");
  return (
    <>
      <h1>登録ページ</h1>
      <button onClick={goToHomePage}>ホームページ</button>
      <button onClick={goToLoginPage}>ログインページ</button>
    </>
  );
};
