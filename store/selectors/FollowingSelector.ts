import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const getFollowings = (state: RootState) => state.FollowingData;
export const selectFollowingList = createSelector(getFollowings, (state: any) => state.data)
export const selectFollowingLoading = createSelector(getFollowings, (state: any) => state.loading)
export const selectFollowingError = createSelector(getFollowings, (state: any) => state.error)