import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectTotalNapaUsersCount = (state: RootState) => state.getTotalNapaUsersCountData;
export const selectTotalNapaUsersCountData = createSelector(selectTotalNapaUsersCount, (state: any) => state?.data)
export const selectTotalNapaUsersCountLoading = createSelector(selectTotalNapaUsersCount, (state: any) => state.loading)
export const selectTotalNapaUsersCountError = createSelector(selectTotalNapaUsersCount, (state: any) => state.error)