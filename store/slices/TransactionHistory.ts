import { createSlice } from "@reduxjs/toolkit";

export type TransactionHistoryInitialState = {
    data: any;
    loading: boolean;
    error: string
};

const initialState: TransactionHistoryInitialState = {
    data: [],
    loading: true,
    error: "",
};

const TransactionHistoryListSlicer = createSlice({
    name: "TransactionHistoryDetail",
    initialState: initialState,
    reducers: {
        setTransactionHistoryList(state, action) {
            state.data = action.payload
        },
    },
});

export const transactionHistoryList = TransactionHistoryListSlicer.reducer
export const { setTransactionHistoryList } = TransactionHistoryListSlicer.actions;
