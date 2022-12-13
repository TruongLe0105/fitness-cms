import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubjectDetail } from "pages/subject/types";

const initialState = {
    subjects: [],
    conveniences: [],
    merchants: [],
    gyms: [],
    isLoading: false,
}

const selectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
        },
        setListSubject: (
            state,
            action
        ) => {
            state.isLoading = false;
            state.subjects = action.payload;
        },
        setListConvenience: (state, action) => {
            state.isLoading = false;
            state.conveniences = action.payload;
        },
        setListMerchant: (
            state,
            action
        ) => {
            state.isLoading = false;
            state.merchants = action.payload;
        },
        setListGyms: (
            state,
            action
        ) => {
            // state.isLoading = false;
            state.gyms = action.payload;
        },
    }
});

export const { setListSubject, setListConvenience, setListMerchant, setListGyms } = selectSlice.actions;

export const selectReducer = selectSlice.reducer;