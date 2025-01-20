import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type WeatherResponse = {
  city: string;
  temperatureMax: number;
  temperatureMin: number;
  description: string;
};

type WeatherRequest = {
  city: string;
};

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Weather"],
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherResponse, WeatherRequest>({
      query: ({ city }) => `weather/${city}`,
      providesTags: ["Weather"],
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
