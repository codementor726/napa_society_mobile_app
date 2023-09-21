import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectWallet = (state: RootState) => state.wallet;
export const selectWalletList = createSelector(selectWallet, (state) => state.walletAddress)
export const selectWalletLoading = createSelector(selectWallet, (state) => state.loading)