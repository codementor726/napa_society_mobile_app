import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectMintedPost = (state: RootState) => state.MintedPostData;
export const selectMintedPostList = createSelector(selectMintedPost, (state: any) => state.data)
export const selectMintedPostLoading = createSelector(selectMintedPost, (state: any) => state.loading)
export const selectMintedPostError = createSelector(selectMintedPost, (state: any) => state.error)