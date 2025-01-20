import { FC, useState } from "react";
import { WeatherButton } from "../../parts/weatherButton";
import { useForm } from "react-hook-form";
import { WeatherInput } from "../../parts/weatherInput";
import { useGetWeatherQuery } from "../../../../../../../store/api/weatherApi";

export type WeatherIFormInput = {
  city: string;
};

export const WeatherSearchBox: FC = () => {
  const { register, handleSubmit } = useForm<WeatherIFormInput>();
  const [city, setCity] = useState<string>("");
  const { data: weatherData } = useGetWeatherQuery(
    { city },
    {
      skip: !city,
    }
  );
  const onSubmit = (data: WeatherIFormInput) => {
    setCity(data.city);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center mt-8 "
      >
        <WeatherInput label="都市名" register={register} />
        <WeatherButton />
      </form>
      {weatherData && (
        <div className="mt-8">
          <p>{weatherData.city}</p>
          <p>{weatherData.temperatureMax}度</p>
          <p>{weatherData.temperatureMin}度</p>
          <p>{weatherData.description}</p>
        </div>
      )}
    </>
  );
};
