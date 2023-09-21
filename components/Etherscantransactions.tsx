import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {PayoutNapaIcon} from '../assets/svg';
import {NapaIcon} from '../assets/svg/NapaIcon';

type EtherscantransactionsProps = {};

const Etherscantransactions: React.FC<EtherscantransactionsProps> = () => {
  return (
    <ScrollView>
      <View style={styles.rewardContainer}>
        <View style={styles.rewardContainerCard}>
          <View style={styles.container}>
            <View style={{}}>
              <View>
                <Text style={[styles.headingText]}>Txn Hash</Text>
                <Text style={[styles.text,{color:themeColors.aquaColor}]}>0xdb4f..4ba2s</Text>
              </View>
              <View style={{marginTop: moderateScale(10)}}>
                <Text style={[styles.headingText]}>Block</Text>
                <Text style={[styles.text,{color:themeColors.aquaColor}]}>153915855</Text>
              </View>

              <View style={{marginTop: moderateScale(10)}}>
                <Text style={[styles.headingText]}>From</Text>
                <Text style={[styles.text,{color:themeColors.aquaColor}]}>Endless Rays</Text>
              </View>
              <View style={{marginTop: moderateScale(10)}}>
                <Text style={[styles.headingText]}>Value</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <NapaIcon />
                  <Text style={[styles.text1]}> 0.56 NAPA</Text>
                </View>
              </View>
            </View>
            <View>
              <View>
                <Text style={[styles.headingText]}>Method</Text>
                <Text style={[styles.text]}>Transfer</Text>
              </View>

              <View style={{marginTop: moderateScale(10)}}>
                <Text style={[styles.headingText]}>Age</Text>
                <Text style={[styles.text]}>9 sec ago</Text>
              </View>

              <View
                style={{
                  marginTop: moderateScale(10),
                  paddingBottom: verticalScale(10),
                }}>
                <Text style={[styles.headingText]}>To</Text>
                <Text style={[styles.text,{color:themeColors.aquaColor}]}>Wave Postive</Text>
              </View>
              <View >
                <Text style={[styles.headingText]}>Txn Fee</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <NapaIcon />
                  <Text style={[styles.text1]}> 0.56 NAPA</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Etherscantransactions;

const styles = StyleSheet.create({
  rewardContainer: {},
  rewardContainerCard: {
    paddingHorizontal: moderateScale(24),
    borderBottomWidth: 1,
    borderColor: themeColors.garyColor,
    paddingVertical: moderateScale(23),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(25),
    marginTop: verticalScale(10),
  },
  headingText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.sl,
    fontWeight: '500',
    // lineHeight: 16,
  },
  text: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    paddingVertical: verticalScale(5),
  },
  text1: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
  },
});
