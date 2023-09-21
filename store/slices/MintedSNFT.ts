import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllMintedPosts } from "../../utils/mintApi";
import { MintPost } from "../../typings/mint";

export type MintedInitialState = {
    data: MintPost[];
    loading: boolean;
    error: string
};

const initialState: MintedInitialState = {
    data: [],
    loading: true,
    error: "",
};

export const fetchMintedPost: any = createAsyncThunk("MintedPost/fetch", ({ accountId, offset }: any) => getAllMintedPosts(accountId, offset));
const MintedPostSlicer = createSlice({
    name: "MintedPost",
    initialState: initialState,
    reducers: {
        setMintedPost(state, action) {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMintedPost.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchMintedPost.fulfilled, (state, action) => {
            state.loading = false;
            state.data = [...state.data, ...action.payload.data];
            state.error = ""
        });
        builder.addCase(fetchMintedPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const MintedPostData = MintedPostSlicer.reducer
export const { setMintedPost } = MintedPostSlicer.actions