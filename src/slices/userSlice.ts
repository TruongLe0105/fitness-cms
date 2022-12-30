import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    isLoading: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        setListUser: (
            state,
            action
        ) => {
            state.isLoading = false;
            state.users = action.payload;
        },
    }
});

export const { setListUser } = userSlice.actions;

export const userReducer = userSlice.reducer;