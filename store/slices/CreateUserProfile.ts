import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateUserProfile, updateUserProfile } from "../../services/AuthApi";
import { LogBox } from "react-native";

export type CreateUserProfile = {
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
    emailAddress: string | null;
    napaWalletAccount: string | null;
    binanceWalletAccount: string | null;
    dailyActive: string;
    monthlyActive: string;

};
export type CreateUserProfileInitialState = {
    data: CreateUserProfile;
    loading: boolean;
    error: string;
    isLoading?: boolean;
    termAndConditions?: string;

};
const initialState: CreateUserProfileInitialState = {
    //@ts-ignore
    data: [],
    loading: false,
    error: "",
    isLoading: false,
    termAndConditions: 'false'

};
export const CreateNewUserProfile: any = createAsyncThunk("profile/Create", (data) => CreateUserProfile(data));
const CreateUserProfileSlicer = createSlice({
    name: "CreateUserProfile",
    initialState: initialState,
    reducers: {
        setTermAndConditions(state, action) {
            state.termAndConditions = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(CreateNewUserProfile.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(CreateNewUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(CreateNewUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log(state.error, "state.error")
        });
    },
});

export const UpdateUserProfile: any = createAsyncThunk("profile/Create", (walletAddress, data) => updateUserProfile(walletAddress, data));
const UpdateUserProfileSlicer = createSlice({
    name: "UpdateUserProfileSlicer",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(UpdateUserProfile.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(UpdateUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
            state.error = ""
        });
        builder.addCase(UpdateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const CreateUserProfileData = CreateUserProfileSlicer.reducer
export const UpdateUserProfileReducer = UpdateUserProfileSlicer.reducer
export const { setTermAndConditions } = CreateUserProfileSlicer.actions


