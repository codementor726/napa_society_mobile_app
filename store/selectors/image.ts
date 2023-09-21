import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
export const selectImage = (state: RootState) => state.image;
export const selectImageList = createSelector(selectImage, (state) => state.image)
export const selectImageObject = createSelector(selectImage, (state) => state.imageObj)
export const selectImageLoading = createSelector(selectImage, (state) => state.loading)