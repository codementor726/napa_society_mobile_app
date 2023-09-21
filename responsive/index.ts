import { Dimensions, PixelRatio } from "react-native";
let width = Dimensions.get('window').width
const fontSize = (size: any) => {
    size = (width > 480 ? size * 0.6 : size) / 3.85;
    // Convert string input to decimal number
    const elemWidth = parseFloat(size);
    return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};
export { fontSize }