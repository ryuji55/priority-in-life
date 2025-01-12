import { FC } from "react";
import { TodoCard } from "./parts/todoCard";
import { useGetTodosQuery } from "../../../../../store/api/todoApi";
import { useCreateTodo } from "../../hooks/useCreateTodo";

export const TodoPage: FC = () => {
  const { data, isLoading } = useGetTodosQuery();

  const { onSubmit, error, register, handleSubmit } = useCreateTodo();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl">Todo Page</h1>
      <p>{error}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label>
          Title
          <input
            {...register("title")}
            className="border border-gray-500 ml-4 pl-2"
          />
        </label>
        <label>
          Content
          <input
            {...register("content")}
            className="border border-gray-500 ml-4 pl-2"
          />
        </label>
        <button
          type="submit"
          className="w-32 bg-blue-300 mx-auto border rounded-3xl mb-5"
        >
          カードを作る
        </button>
      </form>
      {data &&
        data?.length > 0 &&
        data.map(({ title, content, createdAt }, index) => (
          <TodoCard
            key={index}
            title={title}
            content={content}
            createdAt={createdAt}
          />
        ))}
    </div>
  );
};
