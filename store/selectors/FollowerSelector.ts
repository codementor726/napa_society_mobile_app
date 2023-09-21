import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const getFollowers = (state: RootState) => state.followerData;
export const selectFollowersList = createSelector(getFollowers, (state: any) => state.data)
export const selectFollowersLoading = createSelector(getFollowers, (state: any) => state.loading)
export const selectFollowersError = createSelector(getFollowers, (state: any) => state.error)