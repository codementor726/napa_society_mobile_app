import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {AssetsNapaWhiteIcon} from '../assets/svg';
import {NapaTokenIcon} from '../assets/svg/NapaTokenIcon';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {width} from '../utils/helper';

const EarnToken = () => {
  return (
    <View style={styles.mainToken}>
      <View style={styles.napaToken}>
        <NapaTokenIcon />
        <View style={styles.textContainer}>
          <View style={styles.mainTextContainer}>
            <Text style={styles.text}>NAPA Token</Text>
            <View style={styles.napaTextContainer}>
              <AssetsNapaWhiteIcon />
              <Text style={styles.tokenRigntNum}>20.01</Text>
            </View>
          </View>
          <View style={{height: moderateScale(2)}}></View>
          <View style={styles.mainTextContainer}>
            <Text style={styles.textgray}>NAPA</Text>
            <Text style={styles.textgray}></Text>
          </View>
        </View>
      </View>

      <View style={styles.claimcard}>
        <View style={styles.claimcardView}>
          <View style={styles.claimView}>
            <Text style={styles.claimcardHead}>Lock Start Date</Text>
            <Text style={styles.claimcardText}></Text>
          </View>
          <View style={[styles.claimView]}>
            <Text style={styles.claimcardHead}>Interest Period</Text>
            <Text style={styles.claimcardText}></Text>
          </View>
          <View style={[styles.claimView]}>
            <Text style={styles.claimcardHead}>Lock Duration</Text>
            <Text style={styles.claimcardText}></Text>
          </View>
        </View>

        <View style={styles.claimcardView}>
          <View style={[styles.claimView]}>
            <Text style={styles.claimcardHead}>Daily APY</Text>
            <Text style={styles.claimcardText}></Text>
          </View>
          <View style={[styles.claimView]}>
            <Text style={styles.claimcardHead}>Earned Awards</Text>
            <Text style={styles.claimcardText}></Text>
          </View>
          <TouchableOpacity
            style={[styles.claimView, {justifyContent: 'flex-end'}]}>
            <Text style={styles.claim}>Claim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EarnToken;
const styles = StyleSheet.create({
  mainToken: {
    marginHorizontal: moderateScale(16),
    paddingVertical: moderateScale(18),
    borderBottomColor: themeColors.garyColor,
    borderBottomWidth: 0.5,
    marginTop: moderateScale(10),
  },
  napaToken: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: moderateScale(10),
  },
  mainTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  napaTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenText: {
    marginLeft: moderateScale(10),
  },
  text: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
  tokenRigntNum: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    marginLeft: moderateScale(5),
    paddingTop: 1,
  },
  textgray: {
    fontFamily: Fontfamily.Avenier,
    color: themeColors.garyColor,
    fontSize: size.s,
  },
  tokenTextRight: {},
  tokenTextgray: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
  },
  claimcardView: {
    marginTop: moderateScale(18),
    flexDirection: 'row',
    flex: 1,
  },
  claimView: {
    width: width / 2.98,
  },
  claimcard: {
    paddingBottom: moderateScale(10),
  },
  claimcardHead: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.s,
    paddingBottom: moderateScale(3),
  },
  claimcardText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
  },
  claim: {
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.lg,
    color: themeColors.aquaColor,
    paddingRight: moderateScale(7),
  },
});
