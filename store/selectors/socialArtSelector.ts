import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectSocial = (state: RootState) => state.socialArtPostData;
export const selectSocialList = createSelector(selectSocial, (state) => state.data)
export const selectSocialMintedPostList = createSelector(selectSocial, (state) => state.mintedPost)
export const selectSocialVideoUploaded = createSelector(selectSocial, (state) => state.videoUploaded)
export const selectSocialLoading = createSelector(selectSocial, (state) => state.loading)
export const selectSocialError = createSelector(selectSocial, (state) => state.error)