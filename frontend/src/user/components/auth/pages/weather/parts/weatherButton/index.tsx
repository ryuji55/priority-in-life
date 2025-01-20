import { FC } from "react";

export const WeatherButton: FC = () => {
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white mx-auto mt-6 px-4 py-2 w-1/4 rounded hover:bg-blue-600"
    >
      検索
    </button>
  );
};
