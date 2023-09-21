import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {PayoutIcon} from '../assets/svg';
import {WhiteStarIcon} from '../assets/svg/WhiteStarIcon';

type AssetsListFavoritesProps = {
  title: string;
  heading?: string;
  point?: string;
};
const AssetsListFavorites: React.FC<AssetsListFavoritesProps> = ({
  title,
  heading,
  point,
}) => {
  return (
    <TouchableOpacity style={styles.mainContainerCardOP}>
      <ImageBackground
        imageStyle={{borderRadius: 24}}
        source={require('../assets/images/MarketItemAll.png')}
        style={styles.marketPlaceCard}>
        <View style={styles.marketPlaceTop}>
          <Image
            style={styles.marketPlaceTopImage}
            source={require('../assets/images/profile.png')}
          />
          <Text style={styles.marketPlaceTopText}>{title}</Text>
          <WhiteStarIcon />
        </View>
        <View style={styles.marketPlaceBottom}>
          <Text style={styles.marketPlaceBottomText}>{heading}</Text>
          <View style={styles.marketPlaceBottomIcon}>
            <PayoutIcon />
            <Text style={styles.marketPlaceIconText}>{point}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default AssetsListFavorites;

const styles = StyleSheet.create({
  mainContainerCardOP: {
    height: verticalScale(180),
    marginHorizontal:
      Dimensions.get('window').width < 400
        ? moderateScale(3)
        : moderateScale(5),
    marginBottom: moderateScale(8),
    width:
      Dimensions.get('window').width < 400
        ? verticalScale(150)
        : verticalScale(145),
  },
  marketPlaceCard: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(10),
    height: verticalScale(180),
    justifyContent: 'space-between',
  },
  marketPlaceTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(5),
  },
  marketPlaceTopImage: {
    borderRadius: 50,
  },
  marketPlaceTopText: {
    marginLeft: moderateScale(5),
    marginRight: moderateScale(5),
    color: themeColors.primaryColor,
    fontSize: size.s,
    fontWeight: '400',
    fontFamily: Fontfamily.Avenier,
  },
  marketPlaceBottom: {},
  marketPlaceBottomText: {
    color: themeColors.primaryColor,
    fontSize: 15,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    width: verticalScale(130),
    marginBottom: moderateScale(10),
  },
  marketPlaceBottomIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: moderateScale(7),
  },
  marketPlaceIconText: {
    marginLeft: moderateScale(10),
    color: themeColors.primaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Avenier,
  },
});
