import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
        setInfoAuth: (state, action) => {
            state.user = action.payload;
        },
        setAccountWeb3: (state, action) => {
            state.accountWeb3 = action.payload;
        },
    },
});
export const { setInfoAuth, setAccountWeb3 } = authSlice.actions;
export const authReducer = authSlice.reducer;
