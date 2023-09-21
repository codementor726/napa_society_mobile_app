import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectAuthorize = (state: RootState) => state.authorizeData;
export const selectAuthorizeData = createSelector(selectAuthorize, (state) => state.AuthorizeData)
export const selectScannedWalletAddress = createSelector(selectAuthorize, (state) => state.ScannedWalletAddress);    