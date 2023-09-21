import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Layout from '../common/Layout';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {verticalScale} from 'react-native-size-matters';
import {FaceidIcon} from '../assets/svg/FaceidIcon';
const FaceidSetup = () => {
  return (
    <Layout>
      <View style={styles.touchidCointanier}>
        <View>
          <FaceidIcon />
        </View>
        <Text style={styles.pageHeadingText}>Sign Up with Face ID</Text>
        <Text style={styles.pageMessageText}>
          Please use use your face ID biometrics stored on your deivce to create
          your NAPA account
        </Text>
      </View>
      <View style={styles.buyButton}>
        <TouchableOpacity style={styles.buy}>
          <Text style={styles.buyText}>Create My Account With Face ID</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default FaceidSetup;
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
