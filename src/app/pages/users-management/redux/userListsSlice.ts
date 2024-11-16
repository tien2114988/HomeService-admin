import { QueryState } from "../../../../lib/helper";
import { UserModel } from "@/app/modules/auth/core/_models";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.API_URL;
type UsersState = {
  userLists: UserModel[];
  isLoading: boolean;
  isSelected: number | undefined;
};
const initialState: UsersState = {
  userLists: [],
  isLoading: false,
  isSelected: undefined,
};

export const getAllUser = createAsyncThunk(
  "userLists/getAllUser",
  async ({ query }: { query: QueryState }) => {
    const queryString = new URLSearchParams(
      query as unknown as Record<string, string>
    ).toString();
    const response = await axios.get(`${API_URL}/users?${queryString}`);
    return response.data.data;
  }
);

export const createUser = createAsyncThunk(
  "userLists/createUser",
  async (user: UserModel) => {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  }
);

export const userListsSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<UserModel>) => {
          state.userLists.push(action.payload);
          state.isLoading = false;
        }
      )
      .addCase(createUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllUser.fulfilled,
        (state, action: PayloadAction<UserModel[]>) => {
          state.userLists = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getAllUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userListsSlice.reducer;
