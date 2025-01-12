import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TodoResponse = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type TodoRequest = {
  title: string;
  content: string;
};

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<TodoResponse[], void>({
      query: () => "todo/my",
      providesTags: ["Todo"],
    }),
    createTodo: builder.mutation<void, TodoRequest>({
      query: (body) => ({
        url: "todo",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation } = todoApi;
