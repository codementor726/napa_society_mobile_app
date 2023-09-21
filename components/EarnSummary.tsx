import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import Button from '../common/Button';

const EarnSummary = () => {
  return (
    <>
      <View style={styles.earnContainer}>
        <Text style={styles.summary}>Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryView}>
            <Text style={styles.summaryTextHead}>Lock Start Date</Text>
            <Text style={styles.summaryText}></Text>
          </View>
          <View style={styles.summaryView}>
            <Text style={styles.summaryTextHead}>Interest Period</Text>
            <Text style={styles.summaryText}></Text>
          </View>
          <View style={styles.summaryView}>
            <Text style={styles.summaryTextHead}>Amount Locked</Text>
            <Text style={styles.summaryText}></Text>
          </View>
          <View style={styles.summaryView}>
            <Text style={styles.summaryTextHead}>Lock Duration</Text>
            <Text style={styles.summaryText}></Text>
          </View>
          <View style={styles.summaryView}>
            <Text style={styles.summaryTextHead}>APY</Text>
            <Text style={styles.summaryText}></Text>
          </View>
          <View style={styles.summaryView}>
            <Text style={styles.summaryTextHead}>Daily APY</Text>
            <Text style={styles.summaryText}></Text>
          </View>
          <View style={styles.summaryView}>
            <Text style={styles.summaryTextHead}>Earned Rewards</Text>
            <Text style={styles.summaryText}></Text>
          </View>
        </View>
      </View>
      <View style={styles.lockAmount}>
        <Text style={styles.lockAmountText}>Lock Amount</Text>
        <View style={styles.lockChild}>
          <Text style={styles.lockChildNumber}>0.0000</Text>
          <Text style={styles.lockChildText}>napa</Text>
        </View>
      </View>
      <View style={styles.duration}>
        <Text style={styles.durationText}>Duration</Text>
        <View>
          <View style={styles.days}>
            <Text style={styles.durationdays}>15 Days</Text>
            <Text style={styles.durationdays}>30 Days</Text>
          </View>
          <View style={styles.days}>
            <Text style={styles.durationdays}>60 Days</Text>
            <Text style={styles.durationdays}>120 Days</Text>
          </View>
        </View>
        <Button
          backgroundColor={themeColors.aquaColor}
          color={themeColors.aquaColor}
          title="Lock"
          textColor="black"
        />
      </View>
    </>
  );
};

export default EarnSummary;
const styles = StyleSheet.create({
  earnContainer: {
    marginTop: moderateScale(15),
    backgroundColor: themeColors.cardsColor,
    borderRadius: 24,
    padding: moderateScale(20),
    // paddingHorizontal:
    // Platform.OS === 'ios' ? moderateScale(6) : moderateScale(6),
  },
  summary: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.lg,
    fontWeight: '400',
  },
  summaryCard: {
    // marginTop: moderateScale(10)
  },
  summaryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  summaryTextHead: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
  },
  summaryText: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
  },
  lockAmount: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(30),
    marginBottom: moderateScale(10),
  },
  lockAmountText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
  },
  lockChild: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  lockChildNumber: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.xxxlg,
  },
  lockChildText: {
    marginLeft: moderateScale(16),
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.md,
    marginBottom: moderateScale(10),
  },
  duration: {
    marginTop: moderateScale(8),
    marginBottom: moderateScale(50),
  },
  durationText: {
    paddingHorizontal: moderateScale(10),
    color: themeColors.garyColor,
    marginBottom: moderateScale(10),
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
  },
  days: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(6),
    padding:moderateScale(2),
  },
  durationdays: {
    color: themeColors.aquaColor,
    borderColor: themeColors.garyColor,
    borderWidth: 0.5,
    width: '50%',
    textAlign: 'center',
    paddingVertical: moderateScale(5),
    marginRight: moderateScale(6),
    marginBottom: moderateScale(6),
    borderRadius: 24,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
  },
});
