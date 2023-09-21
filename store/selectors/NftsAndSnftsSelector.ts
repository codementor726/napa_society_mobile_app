import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectNftsAndSnfts = (state: RootState) => state.NftsAndSnftsData;
export const selectNfts = createSelector(selectNftsAndSnfts, (state: any) => state.Nfts)
export const selectSnfts = createSelector(selectNftsAndSnfts, (state: any) => state.Snfts)
export const selectNftsAndSnftsLoading = createSelector(selectNftsAndSnfts, (state: any) => state.loading)
export const selectNftsAndSnftsError = createSelector(selectNftsAndSnfts, (state: any) => state.error)