import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import { registerApi } from "./api/registerApi";
import { todoApi } from "./api/todoApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(registerApi.middleware)
      .concat(todoApi.middleware),
});

setupListeners(store.dispatch);
