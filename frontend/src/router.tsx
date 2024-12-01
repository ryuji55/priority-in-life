import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";

export const AppRoute: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};
