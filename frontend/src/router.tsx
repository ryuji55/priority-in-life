import { FC, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "./App";
import { LoginPage } from "./login";
import { RegisterPage } from "./register";
import { AuthPage } from "./user/auth";
import axios from "axios";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  // ログインしているかどうかの判定
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        console.log("レスポンス内容を確認", response.data);
        setIsLogin(true);
      } catch (err) {
        console.log("エラー内容を確認", err);
        setIsLogin(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export const AppRoute: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/auth"
          element={
            <PrivateRoute>
              <AuthPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
