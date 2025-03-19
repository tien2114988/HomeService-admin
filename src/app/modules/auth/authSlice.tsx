import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string | null;
  jwt: string | null;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  // Note: a real app would probably have more complex auth state,
  // but for this example we'll keep things simple
  username: null,
  jwt: localStorage.getItem("jwt"),
  isAuthenticated: !!localStorage.getItem("jwt"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn(state, action: PayloadAction<AuthState>) {
      state.username = action.payload.username;
      state.jwt = action.payload.jwt;
      state.isAuthenticated = true;
      if (action.payload.jwt !== null) {
        localStorage.setItem("jwt", action.payload.jwt);
      }
    },
    userLoggedOut(state) {
      state.username = null;
      state.jwt = null;
      state.isAuthenticated = false;
      localStorage.removeItem("jwt");
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export const selectCurrentUsername = (state: RootState) => state.auth.username;

export default authSlice.reducer;
