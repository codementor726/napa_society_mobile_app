import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {CalenderIcon} from '../assets/svg';
import {themeColors} from '../theme/colors';
import EarnToken from './EarnToken';

const EarnStack = () => {
  return (
    <ScrollView>
      <View style={styles.calender}>
        <View style={styles.calenderView}>
          <View style={styles.calenderIcon}>
            <CalenderIcon />
            <Text style={styles.calenderText}>12 Mar 2023 - 24 Apr 2023</Text>
          </View>
          {/* <Search color ='grey'/> */}
        </View>
        <View style={{height: moderateScale(10)}}></View>
        <EarnToken />
        <EarnToken />
        <EarnToken />
      </View>
    </ScrollView>
  );
};

export default EarnStack;
const styles = StyleSheet.create({
  calender: {
    marginTop: moderateScale(20),
    marginBottom: moderateScale(150),
  },
  calenderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
  },
  calenderIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calenderText: {
    marginLeft: moderateScale(10),
    color: themeColors.primaryColor,
  },
});
