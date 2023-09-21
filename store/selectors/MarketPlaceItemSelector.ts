import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectMarketPlace = (state: RootState) => state.MarketPlaceDetailData;
export const selectMarketPlaceList = createSelector(selectMarketPlace, (state: any) => state.data)
export const selectMarketPlaceLoading = createSelector(selectMarketPlace, (state: any) => state.loading)
export const selectMarketPlaceError = createSelector(selectMarketPlace, (state: any) => state.error)