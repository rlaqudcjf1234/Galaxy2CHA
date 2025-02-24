import {createSlice} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist";

const initialState = {
    val: ""
}

export const tokenSlice = createSlice({
    name: "accessToken",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.val = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(PURGE, () => initialState);
    }
})

export const {setAccessToken} = tokenSlice.actions;

export default tokenSlice.reducer;