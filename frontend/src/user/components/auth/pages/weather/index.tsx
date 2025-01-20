import { FC } from "react";
import { WeatherTitle } from "./parts/weatherTitle";
import { WeatherSearchBox } from "./organisms/weatherSearchBox";

export const WeatherPage: FC = () => {
  return (
    <>
      <WeatherTitle />
      <WeatherSearchBox />
    </>
  );
};
