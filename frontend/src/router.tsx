import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { LoginPage } from "./common/components/login";
import { RegisterPage } from "./common/components/register";
import { AuthPage } from "./user/components/auth";
import { useGetMeQuery } from "./store/api/authApi";
import App from "./App";
import { PasswordForgotPage } from "./common/components/password/pages/passwordForgot";
import { PasswordResetPage } from "./common/components/password/pages/passwordReset";
import { TodoPage } from "./user/components/auth/pages/todo";
import { ROUTES } from "./common/constants/route";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { data: user, isLoading } = useGetMeQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export const AppRoute: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<App />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.PASSWORD.FORGOT} element={<PasswordForgotPage />} />
        <Route path={ROUTES.PASSWORD.RESET} element={<PasswordResetPage />} />
        <Route
          path="/auth"
          element={
            <PrivateRoute>
              <AuthPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/auth/todo"
          element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
