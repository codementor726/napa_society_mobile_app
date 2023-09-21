import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
type AssetListNFTProps = {
  title: string;
  points?: number;
  highestOffer?: number;
  floor: number;
  imgUri: any;
  date?: any;
  description?: string;
};
const AssetListNFT: React.FC<AssetListNFTProps> = ({
  title,
  points,
  highestOffer,
  floor,
  imgUri,
  date,
  description,
}) => {
  const inputText: any = description;
  const maxLength = 25;

  let truncatedText = inputText?.substring(0, maxLength);

  if (inputText?.length > maxLength) {
    truncatedText += '...';
  }
  return (
    <View style={styles.assetListItem}>
      <View style={styles.assetListLeft}>
        <Image
          style={{width: 50, height: 50, borderRadius: 12}}
          source={{uri: imgUri}}
        />
        <View style={styles.assetListTextContainer}>
          <Text style={styles.assetListLeftTitle}>
            {title || truncatedText}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.assetListLeftSubTitle}>Minted {date}</Text>
            {/* <AssetsNapaIcon /> */}
            {/* <Text style={styles.assetListLeftSubTitlehighestOffer}>{date}</Text> */}
          </View>
        </View>
      </View>
      {/* <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <AssetsNapaWhiteIcon />
          <Text style={styles.assetListRightTitle}>{points}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.assetListRightSubTitle}>Floor:</Text>
          <AssetsNapaIcon />
          <Text style={styles.assetListRightSubTitlefloor}>{floor}</Text>
        </View>
      </View> */}
    </View>
  );
};

export default AssetListNFT;
const styles = StyleSheet.create({
  assetListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  assetListLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetListTextContainer: {
    marginLeft: moderateScale(12),
  },
  assetListLeftTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    paddingBottom: moderateScale(5),
  },
  assetListLeftSubTitle: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    fontWeight: '500',
    marginRight: moderateScale(8),
  },
  assetListLeftSubTitlehighestOffer: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    fontWeight: '500',
    marginLeft: moderateScale(5),
  },
  assetListRightTitle: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    textAlign: 'right',
    marginLeft: moderateScale(5),
    paddingBottom: moderateScale(5),
  },
  assetListRightSubTitle: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    fontWeight: '500',
    textAlign: 'right',
    marginRight: moderateScale(5),
  },
  assetListRightSubTitlefloor: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    fontWeight: '500',
    textAlign: 'right',
    marginLeft: moderateScale(5),
  },
});
