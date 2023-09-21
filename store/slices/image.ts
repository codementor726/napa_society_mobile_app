import { createSlice } from "@reduxjs/toolkit";
export type ImageInitialState = {
    image: string;
    imageObj: any;
    loading: boolean;
};
const initialState: ImageInitialState = {
    image: "",
    imageObj: {},
    loading: false
}
const ImageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setImg(state, action) {
            state.image = action.payload
        },
        setImgObject(state, action) {
            state.imageObj = action.payload
        }
    }
})
export const imageReducer = ImageSlice.reducer
export const { setImg, setImgObject } = ImageSlice.actions;

