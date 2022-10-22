import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export interface AuthState {
  user: {
    avatar: string;
    firstName: string;
    lastName: string;
    id: string;
    email: string;
  };
  accountWeb3: {
    account: string;
  };
}

const initialState: AuthState = {
  user: {
    avatar: "",
    firstName: "",
    lastName: "",
    id: "",
    email: "",
  },
  accountWeb3: {
    account: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInfoAuth: (
      state: AuthState,
      action: PayloadAction<AuthState["user"]>
    ) => {
      state.user = action.payload;
    },
    setAccountWeb3: (
      state: AuthState,
      action: PayloadAction<AuthState["accountWeb3"]>
    ) => {
      state.accountWeb3 = action.payload;
    },
  },
});
export const { setInfoAuth, setAccountWeb3 } = authSlice.actions;

export const authReducer = authSlice.reducer;
