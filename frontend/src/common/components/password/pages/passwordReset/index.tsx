import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { usePasswordResetMutation } from "../../../../../store/api/authApi";
import { ApiErrorResponse, errors } from "../../../../constants/errors";

type IFormInput = {
  newPassword: string;
  token: string;
};

export const PasswordResetPage: FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [mutation] = usePasswordResetMutation();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutation(data).unwrap();
    } catch (err) {
      const apiError = err as ApiErrorResponse;
      const errorMessage =
        errors[apiError?.data?.message] || "予期せぬエラーが発生しました";
      setError(errorMessage);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">パスワードリセット</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            新しいパスワード
            <input
              type="password"
              {...register("newPassword")}
              className="w-full px-3 py-2 mt-1 border rounded shadow appearance-none focus:outline-none focus:ring focus:border-blue-300"
              placeholder="新しいパスワード"
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            トークン
            <input
              type="text"
              {...register("token")}
              className="w-full px-3 py-2 mt-1 border rounded shadow appearance-none focus:outline-none focus:ring focus:border-blue-300"
              placeholder="リセットトークン"
            />
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline transition-colors duration-200"
          >
            パスワードを更新
          </button>
        </div>
      </form>
    </div>
  );
};
