import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNapaAccounts } from "../../services/napaAccounts";
export type AccountDetails = {
    NWA_1_AC: string;
    NWA_1_CreatedAt: string;
    NWA_1_NE: string;
    NWA_1_PK: string;
    NWA_1_ST: string;
    NWA_1_Type: string;
};

export type AccountInitialState = {
    data: any;
    activeWallet: number;
    activeWalletAddres: string;
    networkType: any;
    loading: boolean;
    error: string
};

const initialState: AccountInitialState = {
    data: {},
    activeWallet: 0,
    activeWalletAddres: "",
    networkType: {
        id: 4,
        title: 'Sepolia Testnet',
        value: "2",
        currencyName: 'SEPOLIA',
    },
    loading: true,
    error: "",
};
export const fetchAccountData: any = createAsyncThunk("account/fetch", (profileId: any) => getNapaAccounts(profileId));
const AccountDetailSlicer = createSlice({
    name: "accountDetail",
    initialState: initialState,
    reducers: {
        setActiveWallet(state, action) {
            state.activeWallet = action.payload
        },
        setNetworkType(state, action) {
            state.networkType = action.payload
        },
        setactiveWalletAddress(state, action) {
            state.activeWalletAddres = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAccountData.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchAccountData.fulfilled, (state, action) => {
            const account = Array.from({ length: 5 }).reduce((acc: any, _, i) => {
                if (action?.payload?.data?.data[`NWA_${i + 1}_AC`]) {
                    acc.push({
                        [`NWA_${i + 1}_AC`]: action?.payload?.data?.data[`NWA_${i + 1}_AC`],
                        [`NWA_${i + 1}_NE`]: action?.payload?.data?.data[`NWA_${i + 1}_NE`],
                        [`NWA_${i + 1}_PK`]: action?.payload?.data?.data[`NWA_${i + 1}_PK`],
                        [`NWA_${i + 1}_ST`]: action?.payload?.data?.data[`NWA_${i + 1}_ST`],
                        [`NWA_${i + 1}_Type`]: action?.payload?.data?.data[`NWA_${i + 1}_Type`],
                        [`NWA_${i + 1}_CreatedAt`]: action?.payload?.data?.data[`NWA_${i + 1}_CreatedAt`],
                    });
                }
                return acc;
            }, []);
            state.loading = false;
            state.data = account
            state.activeWallet = action?.payload?.data?.data?.activeWalletAC
            state.error = ""
        });
        builder.addCase(fetchAccountData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const accountData = AccountDetailSlicer.reducer
export const { setActiveWallet, setNetworkType, setactiveWalletAddress } = AccountDetailSlicer.actions;
