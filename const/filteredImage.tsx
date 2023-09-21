import {Image, StyleSheet, Text} from 'react-native';
import {
  Grayscale,
  ColorMatrix,
  concatColorMatrices,
  invert,
  contrast,
  saturate,
  sepia,
  tint,
} from 'react-native-color-matrix-image-filters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {verticalScale} from 'react-native-size-matters';

const CombinedFiltersImage = (imageProps: any) => (
  <ColorMatrix
    matrix={concatColorMatrices(sepia(), tint(1.25))}
    style={styles.functionContainer}>
    <Image {...imageProps} />
    <Text style={styles.functionText}>Normal</Text>
  </ColorMatrix>
);
const GrayscaledImage = (imageProps: any) => (
  <Grayscale style={styles.functionContainer}>
    <Image {...imageProps} />
    <Text style={styles.functionText}>Clarendon</Text>
  </Grayscale>
);
const GrayscaledImage1 = (imageProps: any) => (
  <Grayscale style={styles.functionContainer}>
    <Image {...imageProps} />
    <Text style={styles.functionText}>Gingham</Text>
  </Grayscale>
);
const GrayscaledImage2 = (imageProps: any) => (
  <Grayscale style={styles.functionContainer}>
    <Image {...imageProps} />
    <Text style={styles.functionText}>Moon</Text>
  </Grayscale>
);
const ClarendonFilter = (imageProps: any) => (
  <ClarendonFilter
    //@ts-ignore
    matrix={concatColorMatrices(saturate(0.9), contrast(5.2), invert())}
    style={styles.functionContainer}>
    <Image {...imageProps} />
    <Text style={styles.functionText}>ClarendonFilter</Text>
  </ClarendonFilter>
);
// const ColorMatrixImage = (imageProps: any) => (
//   <ColorMatrix
//     matrix={concatColorMatrices(saturate(-0.9), contrast(5.2), invert())}>
//     {/* <Image {...imageProps} /> */}
//     <Video
//       {...imageProps} // the video file
//       paused={false}
//       repeat={true}
//       style={{width: '100%', height: '100%'}}
//       muted={false}
//       resizeMode={'cover'}
//       volume={1.0}
//       rate={1.0}
//       ignoreSilentSwitch={'ignore'}
//       playWhenInactive={true}
//       playInBackground={true}
//     />
//   </ColorMatrix>
// );

const filteredImages = [
  CombinedFiltersImage,
  GrayscaledImage,
  // ColorMatrixImage,
  GrayscaledImage1,
  GrayscaledImage2,
  ClarendonFilter,
];

export {filteredImages};
const styles = StyleSheet.create({
  functionContainer: {
    alignItems: 'center',
  },
  functionText: {
    paddingTop: verticalScale(10),
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: size.md,
  },
});
