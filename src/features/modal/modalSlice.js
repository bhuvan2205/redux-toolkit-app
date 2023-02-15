import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toOpen: (state) => {

            state.isOpen = true;
        },
        toClose: (state) => {

            state.isOpen = false;
        }
    }
});

export const { toOpen, toClose } = modalSlice.actions;

export default modalSlice.reducer;