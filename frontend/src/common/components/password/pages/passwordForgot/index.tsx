import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { usePasswordForgotMutation } from "../../../../../store/api/authApi";
import {
  ApiErrorResponse,
  getErrorMessage,
} from "../../../../constants/errors";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/route";

type IFormInput = {
  email: string;
};

export const PasswordForgotPage: FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [mutation] = usePasswordForgotMutation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const goToLoginPage = () => navigate(ROUTES.LOGIN);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutation(data).unwrap();
    } catch (err) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError?.data?.message));
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          パスワード変更リクエスト
        </h1>

        {error && (
          <p className="mb-4 text-sm text-center text-red-500">{error}</p>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              メールアドレス
              <input
                type="email"
                {...register("email")}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="example@example.com"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            送信
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={goToLoginPage}
            className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline transition-colors duration-200"
          >
            ログインページに戻る
          </button>
        </div>
      </div>
    </div>
  );
};
