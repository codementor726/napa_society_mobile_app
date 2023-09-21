import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSnfts } from "../../services/MarketPlace";

export type MarketPlaceInitialState = {
    data: any;
    loading: boolean;
    error: string
};

const initialState: MarketPlaceInitialState = {
    data: [],
    loading: true,
    error: "",
};

export const MarketPlaceData: any = createAsyncThunk("MarketPlace/fetch", (limit: any) => getAllSnfts(limit));
const MarketDetailSlicer = createSlice({
    name: "MarketDetail",
    initialState: initialState,
    reducers: {
        setMarketPlaceData: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(MarketPlaceData.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(MarketPlaceData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(MarketPlaceData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const MarketPlaceDetailData = MarketDetailSlicer.reducer
export const { setMarketPlaceData } = MarketDetailSlicer.actions
