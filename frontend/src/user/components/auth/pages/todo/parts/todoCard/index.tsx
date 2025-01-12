import { FC } from "react";

type Props = {
  title: string;
  content: string;
  createdAt: string;
};

export const TodoCard: FC<Props> = ({ title, content, createdAt }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 mb-4 max-w-sm hover:shadow-lg transition-shadow group 
        bg-blue-200 hover:bg-blue-300 w-full mx-auto"
    >
      <p className="text-gray-600 text-sm text-left">{createdAt}</p>
      <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};
