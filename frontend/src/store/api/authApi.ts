// src/store/api/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  email: string;
  firstName: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => "me",
    }),
  }),
});

export const { useGetMeQuery } = authApi;
