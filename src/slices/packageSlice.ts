import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    packages: [],
    isLoading: false,
}

const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        setListPackage: (
            state,
            action
        ) => {
            state.isLoading = false;
            state.packages = action.payload;
        },
    }
});

export const { setListPackage } = packageSlice.actions;

export const packageReducer = packageSlice.reducer;