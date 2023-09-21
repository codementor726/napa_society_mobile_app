import { createSlice } from "@reduxjs/toolkit";

export type TokenInitialState = {
    data: any;
    selectedToken: any;
    tokenPrice: number;
    publicKey: string;
    transactionPublicKey: boolean;
    loading: boolean;
    error: string
};

const initialState: TokenInitialState = {
    data: [],
    selectedToken: {},
    tokenPrice: 4.29650254,
    publicKey: "",
    transactionPublicKey: false,
    loading: true,
    error: "",
};

const TokenListSlicer = createSlice({
    name: "accountDetail",
    initialState: initialState,
    reducers: {
        setTokenList(state, action) {
            state.data = action.payload
        },
        setSelectedTokenList(state, action) {
            state.selectedToken = action.payload,
                state.loading = false
        },
        setPublicKey(state, action) {
            state.publicKey = action.payload
        },
        setTokenPrice(state, action) {
            state.tokenPrice = action.payload
        },
        settransactionPublicKey(state, action) {
            state.transactionPublicKey = action.payload
        }
    },
});

export const tokenList = TokenListSlicer.reducer
export const { setTokenList, setSelectedTokenList, setPublicKey, setTokenPrice, settransactionPublicKey } = TokenListSlicer.actions;
