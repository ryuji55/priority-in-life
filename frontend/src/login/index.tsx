import { FC } from "react";
import { useNavigate } from "react-router";

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const goToHomePage = () => navigate("/");
  return (
    <>
      <h1>ログインページ</h1>
      <button onClick={goToHomePage}>ホームページ</button>
    </>
  );
};
