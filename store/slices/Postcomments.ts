import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllComments } from "../../services/PostApi";

export type CommentInitialState = {
    data: any;
    loading: boolean;
    error: string
};

const initialState: CommentInitialState = {
    data: [],
    loading: true,
    error: "",
};

export const fetchComments: any = createAsyncThunk("GetPostComments/fetch", (postId: any) => getAllComments(postId));

const PostCommentsSlicer = createSlice({
    name: "GetComments",
    initialState: initialState,
    reducers: {
        setPostComments(state, action) {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload?.data;
            state.error = ""
        });
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const PostCommentsData = PostCommentsSlicer.reducer
export const { setPostComments } = PostCommentsSlicer.actions