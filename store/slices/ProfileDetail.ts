//@ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfileDetail } from "../../services/AuthApi";
import { Wallet } from "ethers";
// import { ProfileInitialState } from "../../typings/profileDetailType";
export type ProfileDetails = {
    profileId: string;
    profileName: string;
    primaryCurrency: string;
    accountNumber: string;
    language: string;
    timezone: string;
    accountType: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
    avatar: string;
    awardsEarned: number;
    awardsGiven: number;
    netAwardsAvailable: number;
};

export type ProfileInitialState = {
    data: ProfileDetails;
    isLoggedIn: boolean;
    pinCode: string;
    profilePostData: any;
    postDetailPage: boolean;
    loading: boolean;
    error: string
};

const initialState: ProfileInitialState = {
    data: {},
    isLoggedIn: false,
    pinCode: "",
    profilePostData: [],
    postDetailPage: false,
    loading: true,
    error: "",
};

export const fetchProfileData: any = createAsyncThunk("profile/fetch", (obj: any) => getProfileDetail(obj));
const ProfileDetailSlicer = createSlice({
    name: "profileDetail",
    initialState: initialState,
    reducers: {
        setProfileData(state, action) {
            state.data = action.payload
        },
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload
        },
        setpinCode(state, action) {
            state.pinCode = action.payload
        },
        setprofilePostData(state, action) {
            state.profilePostData = action.payload
        },
        setpostDetailPage(state, action) {
            state.postDetailPage = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileData.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchProfileData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(fetchProfileData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const profileDetailData = ProfileDetailSlicer.reducer
export const { setIsLoggedIn, setpinCode, setpostDetailPage, setprofilePostData } = ProfileDetailSlicer.actions;

