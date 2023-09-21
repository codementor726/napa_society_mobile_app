import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectGenre = (state: RootState) => state.GenreData;
export const selectGenreDataList = createSelector(selectGenre, (state: any) => state.data)
export const selectGenreDataLoading = createSelector(selectGenre, (state: any) => state.loading)
export const selectGenreDataError = createSelector(selectGenre, (state: any) => state.error)