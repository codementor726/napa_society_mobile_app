import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTotalNapaUsersCount } from "../../services/PayoutApi";



export type getTotalNapaUsersCountInitialState = {
    data: [];
    loading: boolean;
    error: string
};

const initialState: getTotalNapaUsersCountInitialState = {
    data: [],
    loading: true,
    error: "",
};

export const fetchTotalNapaUsersCount: any = createAsyncThunk("getTotalNapaUsersCount/fetch", () => getTotalNapaUsersCount());


const getTotalNapaUsersCountSlicer = createSlice({
    name: "getTotalNapaUsersCount",
    initialState: initialState,
    reducers: {
        setGetTotalNapaUsersCountSlicer(state, action) {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTotalNapaUsersCount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTotalNapaUsersCount.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = ""
        });
        builder.addCase(fetchTotalNapaUsersCount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const getTotalNapaUsersCountData = getTotalNapaUsersCountSlicer.reducer
export const { setGetTotalNapaUsersCountSlicer } = getTotalNapaUsersCountSlicer.actions