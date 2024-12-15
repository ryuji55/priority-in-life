import axios from "axios";
import { FC } from "react";
import { useNavigate } from "react-router";

export const AuthPage: FC = () => {
  const navigate = useNavigate();
  const goToLoginPage = () => navigate("/login");
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      if (response.status === 200) {
        console.log("ログアウト成功");
        goToLoginPage();
      } else {
        console.error("ログアウト失敗");
      }
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };
  return (
    <>
      <h1>ログインしているページ</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
};
