import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectAccount = (state: RootState) => state.accountData;
export const selectAccountList = createSelector(selectAccount, (state: any) => state.data)
export const selectNapaWallet = createSelector(selectAccount, (state: any) => state.activeWallet)
export const selectActiveWalletAddress = createSelector(selectAccount, (state: any) => state.activeWalletAddres)
export const selectNetworkType = createSelector(selectAccount, (state: any) => state.networkType)
export const selectAccountLoading = createSelector(selectAccount, (state: any) => state.loading)
export const selectAccountError = createSelector(selectAccount, (state: any) => state.error)