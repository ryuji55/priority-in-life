import { FC, useState } from "react";
import { useCreateSleepRecordMutation } from "../../../../../store/api/sleepRecord";
import { useForm } from "react-hook-form";
import {
  ApiErrorResponse,
  getErrorMessage,
} from "../../../../../common/constants/errors";
import { SleepRecordGraph } from "./organisms/sleepRecordGraph";

type SleepFormInput = {
  hours: number;
  date: string;
};

export const SleepRecordPage: FC = () => {
  const [mutation] = useCreateSleepRecordMutation();
  const { register, handleSubmit, reset } = useForm<SleepFormInput>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SleepFormInput) => {
    try {
      await mutation(data).unwrap();
      reset();
    } catch (err) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError?.data?.message));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">睡眠記録</h1>

      <p>{error}</p>
      {/* 入力フォーム */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            日付
            <input
              type="date"
              {...register("date")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            睡眠時間（時間）
            <input
              type="number"
              step="0.5"
              {...register("hours", { min: 0, max: 24 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          記録する
        </button>
      </form>
      <SleepRecordGraph />
    </div>
  );
};
