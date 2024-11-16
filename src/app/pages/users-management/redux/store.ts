import { configureStore } from "@reduxjs/toolkit";
import userListsReducer from "./userListsSlice";
export const store = configureStore({
  reducer: {
    userLists: userListsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
