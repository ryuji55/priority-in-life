import { FC } from "react";
import { useLogout } from "../../../common/hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/constants/route";

export const AuthPage: FC = () => {
  const { handleLogout, error } = useLogout();
  const navigate = useNavigate();
  const goToTodoPage = () => navigate(ROUTES.AUTH.TODO);

  return (
    <>
      <p>{error}</p>
      <h1>ログインしているページ</h1>
      <button onClick={goToTodoPage}>TODOページ</button>
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
};
