import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import { registerApi } from "./api/registerApi";
import { todoApi } from "./api/todoApi";
import { sleepRecordApi } from "./api/sleepRecord";
import { weatherApi } from "./api/weatherApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [sleepRecordApi.reducerPath]: sleepRecordApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(registerApi.middleware)
      .concat(todoApi.middleware)
      .concat(sleepRecordApi.middleware)
      .concat(weatherApi.middleware),
});

setupListeners(store.dispatch);
