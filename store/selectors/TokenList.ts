import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectToken = (state: RootState) => state.tokenList;
export const selectTokenList = createSelector(selectToken, (state: any) => state.data)
export const selectSelectedTokenList = createSelector(selectToken, (state: any) => state.selectedToken)
export const selectTokenPrice = createSelector(selectToken, (state: any) => state.tokenPrice)
export const selectPublicKey = createSelector(selectToken, (state: any) => state.publicKey)
export const selectTransactionPublicKey = createSelector(selectToken, (state: any) => state.transactionPublicKey)
export const selectTokenListLoading = createSelector(selectToken, (state: any) => state.loading)
export const selectTokenListError = createSelector(selectToken, (state: any) => state.error)