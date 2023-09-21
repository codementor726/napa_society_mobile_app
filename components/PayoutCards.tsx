import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {themeColors} from '../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {PayoutIcon} from '../assets/svg';
import SectionHeader from '../common/SectionHeader';
import {SCREENS} from '../typings/screens-enums';
import {useNavigation} from '@react-navigation/native';

const PayoutCards = () => {
  const {navigate} = useNavigation<any>();
  return (
    <View style={styles.container}>
      <SectionHeader title="Payouts" onPress={() => navigate(SCREENS.PAYOUT)} />
      <View style={styles.cardContainer}>
        <View style={styles.payoutCard}>
          <Text style={styles.payoutText}>NAPA Token Price</Text>
          <View style={styles.payoutIcon}>
            <PayoutIcon />
            <Text style={styles.payoutIconText}>2.482.57</Text>
          </View>
        </View>
        <View style={styles.payoutCard}>
          <Text style={styles.payoutText}>Total Users</Text>
          <Text style={styles.payoutUserText}>16 839</Text>
        </View>
      </View>
    </View>
  );
};
export default PayoutCards;
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
    paddingHorizontal:
      Platform.OS === 'ios' ? moderateScale(0) : moderateScale(6),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(80),
  },
  payoutCard: {
    width: '100%',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    marginRight: moderateScale(8),
    backgroundColor: themeColors.cardsColor,
    borderRadius: 24,
    height: verticalScale(90),
    justifyContent: 'center',
    marginBottom: moderateScale(8),
  },
  payoutText: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    color: themeColors.garyColor,
    marginBottom: moderateScale(10),
    paddingTop:
    Platform.OS === 'ios' ? moderateScale(0) : moderateScale(0), 
    fontWeight: '500',
  },
  payoutIconText: {
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.xxlg,
    fontWeight: '500',
    color: themeColors.primaryColor,
    marginLeft: moderateScale(20),
  },
  payoutIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payoutUserText: {
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.xxlg,
    fontWeight: '500',
    color: themeColors.primaryColor,
  },
});
