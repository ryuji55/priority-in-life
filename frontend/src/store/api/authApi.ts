import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  email: string;
  firstName: string;
}

type LoginRequest = {
  email: string;
  password: string;
};

type PasswordForgotRequest = {
  email: string;
};

type PasswordResetRequest = {
  newPassword: string;
  token: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginRequest>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => "me",
    }),
    passwordForgot: builder.mutation<void, PasswordForgotRequest>({
      query: (body) => ({
        url: "password/forgot",
        method: "POST",
        body,
      }),
    }),
    passwordReset: builder.mutation<User, PasswordResetRequest>({
      query: (body) => ({
        url: "password/reset",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  usePasswordForgotMutation,
  usePasswordResetMutation,
} = authApi;
