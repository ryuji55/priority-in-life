import { useState } from "react";
import {
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { useCreateTodoMutation } from "../../../../store/api/todoApi";
import {
  ApiErrorResponse,
  getErrorMessage,
} from "../../../../common/constants/errors";

type IFormInput = {
  title: string;
  content: string;
};

type Return = {
  onSubmit: (data: IFormInput) => void;
  error: string | null;
  register: UseFormRegister<IFormInput>;
  handleSubmit: UseFormHandleSubmit<IFormInput, undefined>;
};

export const useCreateTodo = (): Return => {
  const [error, setError] = useState<string | null>(null);
  const [mutation] = useCreateTodoMutation();
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async ({ title, content }) => {
    try {
      await mutation({ title: title, content: content }).unwrap();
      reset();
    } catch (err) {
      const apiError = err as ApiErrorResponse;
      setError(getErrorMessage(apiError?.data?.message));
    }
  };
  return {
    onSubmit,
    error,
    register,
    handleSubmit,
  };
};
