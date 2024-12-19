import { useLogout } from "@/common/hooks/useLogout";
import { FC } from "react";

export const AuthPage: FC = () => {
  const { handleLogout, error } = useLogout();

  return (
    <>
      <p>{error}</p>
      <h1>ログインしているページ</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
};
