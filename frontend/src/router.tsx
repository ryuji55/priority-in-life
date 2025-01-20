import { FC } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router";
import { LoginPage } from "./common/components/login";
import { RegisterPage } from "./common/components/register";
import { AuthPage } from "./user/components/auth";
import { useGetMeQuery } from "./store/api/authApi";
import App from "./App";
import { PasswordForgotPage } from "./common/components/password/pages/passwordForgot";
import { PasswordResetPage } from "./common/components/password/pages/passwordReset";
import { TodoPage } from "./user/components/auth/pages/todo";
import { ROUTES } from "./common/constants/route";
import { SleepRecordPage } from "./user/components/auth/pages/sleepRecord";
import { WeatherPage } from "./user/components/auth/pages/weather";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PRIVATE_ROUTES = [
  {
    path: ROUTES.AUTH.ROOT,
    element: <AuthPage />,
  },
  {
    path: ROUTES.AUTH.TODO,
    element: <TodoPage />,
  },
  {
    path: ROUTES.SLEEP_RECORD,
    element: <SleepRecordPage />,
  },
  {
    path: ROUTES.WEATHER,
    element: <WeatherPage />,
  },
] as const;

const PUBLIC_ROUTES = [
  {
    path: ROUTES.HOME,
    element: <App />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.PASSWORD.FORGOT,
    element: <PasswordForgotPage />,
  },
  {
    path: ROUTES.PASSWORD.RESET,
    element: <PasswordResetPage />,
  },
] as const;

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { data: user, isLoading } = useGetMeQuery();
  const isLoginPath = useParams().path === ROUTES.LOGIN;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // すでにログインしている場合はAuthページへリダイレクト
  if (user && isLoginPath) {
    return <Navigate to={ROUTES.AUTH.ROOT} />;
  }

  // 未ログインの場合はログインページへ
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} />;
  }
  return <>{children}</>;
};

export const AppRoute: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {PUBLIC_ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {PRIVATE_ROUTES.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PrivateRoute>{element}</PrivateRoute>}
          />
        ))}

        <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
      </Routes>
    </BrowserRouter>
  );
};
