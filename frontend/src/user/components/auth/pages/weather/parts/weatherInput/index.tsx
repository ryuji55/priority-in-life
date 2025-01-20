import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { WeatherIFormInput } from "../../organisms/weatherSearchBox";

type Props = {
  label: string;
  register: UseFormRegister<WeatherIFormInput>;
};

export const WeatherInput: FC<Props> = ({ label, register }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        <input
          type="text"
          {...register("city")}
          className="mt-1 block w-1/4 mx-auto border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </label>
    </div>
  );
};
