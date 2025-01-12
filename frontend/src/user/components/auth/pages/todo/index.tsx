import { FC, useState } from "react";
import { TodoCard } from "./parts/todoCard";
import { useForm } from "react-hook-form";

type IFormInput = {
  title: string;
  content: string;
};

export const TodoPage: FC = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [todos, setTodos] = useState<IFormInput[]>([]);

  const onSubmit = (data: IFormInput) => {
    setTodos([...todos, data]);
    reset();
  };
  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl">Todo Page</h1>
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
      {todos.length > 0 &&
        todos.map(({ title, content }, index) => (
          <TodoCard key={index} title={title} content={content} />
        ))}
    </div>
  );
};
