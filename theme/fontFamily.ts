import { Platform } from "react-native";
export const Fontfamily = {
  Avenier: Platform.OS === "ios" ? "Avenir" : "Avenir-Regular",
  Neuropolitical:
    Platform.OS === "ios" ? "Neuropolitical" : "Neuropolitical-Regular",
  Grostestk:
    Platform.OS === "ios"
      ? "FontsFreeNetUlmGrotesk"
      : "FontsFreeNetUlmGrotesk-Bold",
};
