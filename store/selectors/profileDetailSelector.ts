import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectProfile = (state: RootState) => state.profileDetailData;
export const selectProfileList = createSelector(selectProfile, (state: any) => state.data)
export const selectIsLoggedIn = createSelector(selectProfile, (state: any) => state.isLoggedIn)
export const selectPinCode = createSelector(selectProfile, (state: any) => state.pinCode)
export const selectProfilePostData = createSelector(selectProfile, (state: any) => state.profilePostData)
export const selectPostDetailPage = createSelector(selectProfile, (state: any) => state.postDetailPage)
export const selectProfileLoading = createSelector(selectProfile, (state: any) => state.loading)
export const selectProfileError = createSelector(selectProfile, (state: any) => state.error)