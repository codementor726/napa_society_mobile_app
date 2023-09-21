import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  ImageBackground,
  Image,
} from 'react-native';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {themeColors} from '../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import SectionHeader from '../common/SectionHeader';

const SocialCards = () => {
  return (
    <View style={styles.container}>
      <SectionHeader title="My Minted Posts" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.cardContainer}>
        {Array.from({length: 6}).map((_, index) => {
          return (
            <ImageBackground
              key={`social-art-${index}`}
              imageStyle={{borderRadius: 24}}
              style={styles.socialImage}
              source={require('../assets/images/SocialBackground.png')}
              resizeMode="cover">
              <View style={styles.post}>
                <View style={styles.postTop}>
                  <View style={styles.postTopView}>
                    <View>
                      <Image
                        style={styles.postTopImage}
                        source={require('../assets/images/profile.png')}
                      />
                    </View>
                    <View>
                      <Text style={styles.heading}>Dorothy Mccoy</Text>
                      <Text style={styles.heading1}>Mon, 10 Jan 20:53</Text>
                    </View>
                  </View>
                  <View style={styles.postTimeDiv}>
                    <Text style={styles.time}>Live 04:25:31</Text>
                  </View>
                </View>
                <View style={styles.postBottom}>
                  <View style={styles.minted}>
                    <Text style={styles.mintedText}>Minted</Text>
                  </View>
                  <Text style={styles.postBottomSerpentive}>
                    The Magic Galaxies
                  </Text>
                  <Text style={styles.postBottomText}>
                    Calling an imagine at forbade. At name no an what like spot.
                    Pressed my by do affixed he studied.
                  </Text>
                </View>
              </View>
            </ImageBackground>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default SocialCards;
const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(30),
  },
  Textcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  assets: {
    color: themeColors.primaryColor,
    fontSize: size.lg,
    fontFamily: Fontfamily.Neuropolitical,
  },
  assetsView: {
    color: themeColors.aquaColor,
    fontSize: size.lg,
    fontFamily: Fontfamily.Neuropolitical,
  },
  cardContainer: {
    flexDirection: 'row',
    paddingHorizontal:
      Platform.OS === 'ios' ? moderateScale(0) : moderateScale(6),
    marginTop: moderateScale(10),
  },
  socialImage: {
    width: verticalScale(270),
    height: verticalScale(220),
    justifyContent: 'flex-end',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(18),
    marginRight: moderateScale(8),
  },
  socialProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  socialText: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.default,
    color: themeColors.primaryColor,
  },
  socialProfileText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    color: themeColors.primaryColor,
    marginLeft: 10,
  },
  post: {
    alignContent: 'space-between',
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: moderateScale(3),
  },
  postTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postTopView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postTopImage: {
    borderRadius: 24,
    marginRight: 15,
    marginTop: 5,
    height: verticalScale(30),
    width: verticalScale(30),
  },
  heading: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
  },
  heading1: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    padding: moderateScale(3),
    fontSize: size.s,
  },
  postTimeDiv: {
    backgroundColor: 'rgba(10, 19, 19, 0.2)',
    padding: moderateScale(5),
    borderRadius: 20,
  },
  time: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    fontWeight: '500',
  },
  postBottom: {
    alignContent: 'flex-end',
  },
  minted: {
    backgroundColor: themeColors.aquaColor,
    width: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(3),
    borderRadius: 24,
    marginBottom: moderateScale(10),
  },
  mintedText: {
    color: themeColors.secondaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.s,
  },
  postBottomSerpentive: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.lg,
    fontWeight: '400',
    marginBottom: moderateScale(12),
  },
  postBottomText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    fontWeight: '500',
    lineHeight: 16.8,
  },
});
