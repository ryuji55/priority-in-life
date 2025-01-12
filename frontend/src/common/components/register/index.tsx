import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRegister } from "../../hooks/useRegister";
import { ROUTES } from "../../constants/route";

type IFormInput = {
  firstName: string;
  email: string;
  password: string;
};

export const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const goToHomePage = () => navigate(ROUTES.HOME);
  const goToLoginPage = () => navigate(ROUTES.LOGIN);

  const { register, handleSubmit } = useForm<IFormInput>();
  const { onSubmit, error } = useRegister();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">登録ページ</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm p-4 bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            名前
            <input
              {...register("firstName")}
              className="w-full px-3 py-2 mt-1 border rounded shadow appearance-none focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            メールアドレス
            <input
              {...register("email")}
              className="w-full px-3 py-2 mt-1 border rounded shadow appearance-none focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            パスワード
            <input
              {...register("password")}
              type="password"
              className="w-full px-3 py-2 mt-1 border rounded shadow appearance-none focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline mx-auto"
          >
            送信
          </button>
        </div>
      </form>
      <div className="mt-4 space-x-4">
        <button
          onClick={goToHomePage}
          className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
        >
          ホームページ
        </button>
        <button
          onClick={goToLoginPage}
          className="px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
        >
          ログインページ
        </button>
      </div>
    </div>
  );
};
