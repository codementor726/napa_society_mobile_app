import { createSlice } from "@reduxjs/toolkit";

export type NftsAndSnftsState = {
    Nfts: any;
    Snfts: any;
    loading: boolean;
    error: string
};

const initialState: NftsAndSnftsState = {
    Nfts: [],
    Snfts: [],
    loading: true,
    error: "",
};

const NftsAndSnftsSlicer = createSlice({
    name: "NftsAndSnfts",
    initialState: initialState,
    reducers: {
        setNftsPost(state, action) {
            state.Nfts = action.payload
        },
        setSnftsPost(state, action) {
            state.Snfts = action.payload
        }
    }
});

export const NftsAndSnftsData = NftsAndSnftsSlicer.reducer
export const { setNftsPost, setSnftsPost } = NftsAndSnftsSlicer.actions