import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TouchidIcon} from '../assets/svg/TouchidIcon';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {verticalScale} from 'react-native-size-matters';

const Touchidsetup = () => {
  return (
    <>
      <View style={styles.touchidCointanier}>
        <View>
          <TouchidIcon />
        </View>
        <Text style={styles.pageHeadingText}>Sign Up with Touch ID</Text>
        <Text style={styles.pageMessageText}>
          Please use use your fingerprint biometrics stored on your deivce to
          create your NAPA account
        </Text>
      </View>
      <View style={styles.buyButton}>
        <TouchableOpacity style={styles.buy}>
          <Text style={styles.buyText}>Create My Account With Touch ID</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Touchidsetup;
const styles = StyleSheet.create({
  touchidCointanier: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  pageHeadingText: {
    color: themeColors.primaryColor,
    fontSize: size.lg,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    paddingTop: verticalScale(26),
  },
  pageMessageText: {
    color: themeColors.primaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Avenier,
    paddingTop: verticalScale(12),
  },
  buyButton: {
    marginTop: 40,
    justifyContent: 'flex-end',
    backgroundColor: themeColors.cardsColor,
  },
  buy: {
    backgroundColor: themeColors.aquaColor,
    paddingVertical: verticalScale(22),
  },
  buyText: {
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
});
