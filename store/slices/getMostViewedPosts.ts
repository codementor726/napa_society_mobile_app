import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMostViewedPosts } from "../../services/PostApi";


export type getMostViewedPostsInitialState = {
    data: [];
    loading: boolean;
    error: string
};

const initialState: getMostViewedPostsInitialState = {
    data: [],
    loading: true,
    error: "",
};

export const fetchGetMostViewedPosts: any = createAsyncThunk("getMostViewedPosts/fetch", () => getMostViewedPosts());

const getMostViewedPostsSlicer = createSlice({
    name: "getMostViewedPosts",
    initialState: initialState,
    reducers: {
        setGetMostViewedPosts(state, action) {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetMostViewedPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchGetMostViewedPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = ""
        });
        builder.addCase(fetchGetMostViewedPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const getMostViewedposts = getMostViewedPostsSlicer.reducer
export const { setGetMostViewedPosts } = getMostViewedPostsSlicer.actions