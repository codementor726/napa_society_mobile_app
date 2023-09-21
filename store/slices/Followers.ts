import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleGetFollowers } from "../../services/FollowAndFollowing";

export type FollowersInitialState = {
    data: [];
    loading: boolean;
    error: string
};

const initialState: FollowersInitialState = {
    data: [],
    loading: true,
    error: "",
};

export const fetchFollowers: any = createAsyncThunk("Followers/fetch", (profileId: any) => handleGetFollowers(profileId));

const FollowersSlicer = createSlice({
    name: "fetchFollowers",
    initialState: initialState,
    reducers: {
        setFollowers(state, action) {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFollowers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchFollowers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload?.data;
            state.error = ""
        });
        builder.addCase(fetchFollowers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const followerData = FollowersSlicer.reducer
export const { setFollowers } = FollowersSlicer.actions