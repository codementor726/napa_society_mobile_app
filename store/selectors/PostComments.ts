import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectPostComments = (state: RootState) => state.getPostComments;
export const selectPostCommentsDataList = createSelector(selectPostComments, (state: any) => state?.data)
export const selectPostCommentsDataLoading = createSelector(selectPostComments, (state: any) => state.loading)
export const selectPostCommentsDataError = createSelector(selectPostComments, (state: any) => state.error)