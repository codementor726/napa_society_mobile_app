import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRecentEvents } from "../../services/EventApi";


export type getRecentEventsInitialState = {
    data: [];
    loading: boolean;
    error: string
};

const initialState: getRecentEventsInitialState = {
    data: [],
    loading: true,
    error: "",
};

export const fetchGetRecentEvents: any = createAsyncThunk("getRecentEvents/fetch", () => getRecentEvents());


const getRecentEventsSlicer = createSlice({
    name: "getRecentEvents",
    initialState: initialState,
    reducers: {
        setGetRecentEventsSlicer(state, action) {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetRecentEvents.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchGetRecentEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = ""
        });
        builder.addCase(fetchGetRecentEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const getRecentEventsData = getRecentEventsSlicer.reducer
export const { setGetRecentEventsSlicer } = getRecentEventsSlicer.actions