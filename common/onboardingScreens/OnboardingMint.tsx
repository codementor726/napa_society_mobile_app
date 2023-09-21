import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../Layout';
import {Fontfamily} from '../../theme/fontFamily';
import {themeColors} from '../../theme/colors';
import {size} from '../../theme/fontstyle';
import {fontSize} from '../../responsive';
import {PostNFTIcon} from '../../assets/svg/PostNFTIcon';
import {moderateScale, verticalScale} from 'react-native-size-matters';

const OnboardingMint = () => {
  return (
    <Layout>
      <View style={styles.mainContainer}>
        <View style={styles.firstContainer}>
          <View>
            <PostNFTIcon />
          </View>
          <View style={{marginTop: verticalScale(70)}}>
            <Text style={[styles.headingText]}>Mint Your Post</Text>
            <Text style={[styles.descriptionText]}>
              Create your post and select Mint Now or Advanced Mint and allow your followers and others to award you. {'\n'}
              {'\n'}
  
            </Text>
          </View>
        </View>
        <View>
          <View style={{alignItems: 'center', marginBottom: verticalScale(30)}}>
            <View style={[styles.dotContainer]}>
              <Text style={[styles.Dot]}> </Text>
              <Text style={[styles.ActiveDot]}> </Text>
              <Text style={[styles.Dot]}> </Text>
              <Text style={[styles.Dot]}> </Text>
              <Text style={[styles.Dot]}> </Text>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default OnboardingMint;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    flex: 1,
    marginTop: verticalScale(-70),
  },
  firstContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: moderateScale(24),
  },
  headerText: {
    fontFamily: Fontfamily.Neuropolitical,
    color: themeColors.aquaColor,
    fontSize: size.md,
    fontWeight: '400',
  },
  headingText: {
    fontFamily: Fontfamily.Neuropolitical,
    color: themeColors.primaryColor,
    fontSize: fontSize(32),
    fontWeight: '400',
  },
  descriptionText: {
    fontFamily: Fontfamily.Avenier,
    color: themeColors.primaryColor,
    fontSize: size.md,
    fontWeight: '500',
  },
  dotContainer: {
    justifyContent: 'space-evenly',
    width: '20%',
    flexDirection: 'row',
  },
  ActiveDot: {
    backgroundColor: themeColors.primaryColor,
    width: 18,
    height: 4,
    borderRadius: 20,
  },
  Dot: {
    backgroundColor: themeColors.garyColor,
    width: 5,
    height: 5,
    borderRadius: 20,
  },
});
