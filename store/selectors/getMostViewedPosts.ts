import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const getMostViewedPosts = (state: RootState) => state.getMostViewedPostsData;
export const selectgetMostViewedPostsDataList = createSelector(getMostViewedPosts, (state: any) => state.data)
export const selectgetMostViewedPostsLoading = createSelector(getMostViewedPosts, (state: any) => state.loading)
export const selectgetMostViewedPostsDataError = createSelector(getMostViewedPosts, (state: any) => state.error)