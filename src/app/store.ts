import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/app/modules/counter/counterSlice";
import authReducer from "@/app/modules/auth/authSlice";
import { postApi } from "@/app/api/postApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";
import { workApi } from "./api/workApi";
import { testApi } from "./api/testApi";

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [workApi.reducerPath]: workApi.reducer,
    [testApi.reducerPath]: testApi.reducer,
    counter: counterReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      userApi.middleware,
      authApi.middleware,
      workApi.middleware,
      testApi.middleware
    ),
});

setupListeners(store.dispatch);

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
