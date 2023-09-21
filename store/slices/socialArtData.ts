//@ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../components/socialArtPosts";
import { getAllSocialArtPost } from "../../services/PostApi";
export type Post = {
    postId?: string;
    videoTitle?: string;
    videoURL?: any;
    videoType?: string;
    videoCaption?: string;
    accountId?: string;
    profileId?: any;
    minted?: string;
    createdAt?: string;
    updatedAt?: string;
    profileName?: string;
    avatar?: string;
    likedByUsers?: string;
    commentByUser?: string | null;
    awardsByUsers?: string;
    mintedTimeStamp?: string;
    isExpired?: string;
    paused?: any;
    onLayout?: any;
    onload?: any;
    minted?: string,
    mintedTimeStamp?: any,
    index?: number,
    currentIndex?: number,
    videoThumbnail?: string,
    views?: number,
    setPostDetail?: any
};
export type SocialInitialState = {
    data: any;
    mintedPost: {};
    videoUploaded: boolean;
    loading: boolean;
    error: string
};

const initialState: SocialInitialState = {
    data: [],
    mintedPost: {
        postId: "",
        videoType: "",
        accountId: "",
        profileId: "",
        videoTitle: "",
        videoCaption: "",
        videoURL: "",
        minted: false,
        genre: "",
        videoThumbnail: "",
    },
    videoUploaded: false,
    loading: true,
    error: "",
};

export const fetchSocialArt: any = createAsyncThunk("social/fetch", ({ offset, profileId }) => getAllSocialArtPost({ offset, profileId }));
const SocialArtSlicer = createSlice({
    name: "SocialArtPost",
    initialState: initialState,
    reducers: {
        setSocialData(state, action) {
            state.data = action.payload
        },
        setSocialMintedPost(state, action) {
            state.mintedPost = action.payload
        },
        setSocialVideoUploaded(state, action) {
            state.videoUploaded = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSocialArt.pending, (state, action) => {
            state.data = state.data;
            state.loading = true;
        });
        builder.addCase(fetchSocialArt.fulfilled, (state, action) => {
            state.loading = false;
            state.data = [...state.data, ...action.payload];
            state.error = ""
        });
        builder.addCase(fetchSocialArt.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.data = []
        });
    },
});

export const socialArtPostData = SocialArtSlicer.reducer
export const { setSocialData, setSocialMintedPost, setSocialVideoUploaded } = SocialArtSlicer.actions;