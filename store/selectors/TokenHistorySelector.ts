import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectTransactionHistory = (state: RootState) => state.transactionHistoryList;
export const selectTransactionHistoryList = createSelector(selectTransactionHistory, (state: any) => state.data)
export const selectTransactionHistoryLoading = createSelector(selectTransactionHistory, (state: any) => state.loading)
export const selectTransactionHistoryError = createSelector(selectTransactionHistory, (state: any) => state.error)