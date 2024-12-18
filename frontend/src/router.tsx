import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "./App";
import { LoginPage } from "./login";
import { RegisterPage } from "./register";
import { AuthPage } from "./user/auth";
import { useGetMeQuery } from "./store/api/authApi";

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
