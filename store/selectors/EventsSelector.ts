import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const getRecentEvents = (state: RootState) => state.getRecentEventsData;
export const selectGetRecentEventsList = createSelector(getRecentEvents, (state: any) => state.data)
export const selectGetRecentEventsLoading = createSelector(getRecentEvents, (state: any) => state.loading)
export const selectGetRecentEventsError = createSelector(getRecentEvents, (state: any) => state.error)