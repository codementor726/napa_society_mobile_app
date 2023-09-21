import { createSlice } from "@reduxjs/toolkit";

export type QrAuthorizeInitialState = {
    AuthorizeData: any;
    ScannedWalletAddress: string;
};

const initialState: QrAuthorizeInitialState = {
    AuthorizeData: {},
    ScannedWalletAddress: ""
}

const QrAuthorizeSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setAuthorizeData(state, action) {
            state.AuthorizeData = action.payload
        },
        setScannedWalletAddress(state, action) {
            state.ScannedWalletAddress = action.payload
        }
    }
})
export const authorizeReducer = QrAuthorizeSlice.reducer
export const { setAuthorizeData, setScannedWalletAddress } = QrAuthorizeSlice.actions;

