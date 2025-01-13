import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type SleepRecord = {
  id: string;
  hours: number;
  date: string;
};

type CreateSleepRecord = {
  hours: number;
  date: string;
};

export const sleepRecordApi = createApi({
  reducerPath: "sleepRecordApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["SleepRecord"],
  endpoints: (builder) => ({
    getSleepRecords: builder.query<SleepRecord[], void>({
      query: () => "sleepRecord",
      providesTags: ["SleepRecord"],
    }),
    createSleepRecord: builder.mutation<SleepRecord, CreateSleepRecord>({
      query: (body) => ({
        url: "sleepRecord",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SleepRecord"],
    }),
  }),
});

export const { useGetSleepRecordsQuery, useCreateSleepRecordMutation } =
  sleepRecordApi;
