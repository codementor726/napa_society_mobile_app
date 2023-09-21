import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleGetGenre } from "../../services/GenreApi";

export type GenreInitialState = {
    data: [];
    loading: boolean;
    error: string
};

const initialState: GenreInitialState = {
    data: [],
    loading: true,
    error: "",
};

export const fetchGenre: any = createAsyncThunk("GetGenre/fetch", (profileId: any) => handleGetGenre(profileId));

const GenreSlicer = createSlice({
    name: "GetGenre",
    initialState: initialState,
    reducers: {
        setGenrePost(state, action) {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGenre.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchGenre.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = ""
        });
        builder.addCase(fetchGenre.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const GenreData = GenreSlicer.reducer
export const { setGenrePost } = GenreSlicer.actions