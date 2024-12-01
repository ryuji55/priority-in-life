import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { LoginPage } from "./login";
import { RegisterPage } from "./register";

export const AppRoute: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};
