import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleGetFollowings } from "../../services/FollowAndFollowing";

export type FollowingInitialState = {
    data: [];
    loading: boolean;
    error: string
};

const initialState: FollowingInitialState = {
    data: [],
    loading: true,
    error: "",
};

export const fetchFollowing: any = createAsyncThunk("Following/fetch", (profileId: any) => handleGetFollowings(profileId));

const FollowingSlicer = createSlice({
    name: "fetchFollowing",
    initialState: initialState,
    reducers: {
        setFollowing(state, action) {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFollowing.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchFollowing.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload?.data;
            state.error = ""
        });
        builder.addCase(fetchFollowing.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const FollowingData = FollowingSlicer.reducer
export const { setFollowing } = FollowingSlicer.actions