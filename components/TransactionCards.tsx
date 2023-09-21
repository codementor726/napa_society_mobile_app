import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {DepositIcon} from '../assets/svg';
import {WithdarawalIcon} from '../assets/svg';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';

const TransactionCards = () => {
  const {navigate} = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerChild}
        onPress={() => navigate(SCREENS.DEPOSITSCREEN)}>
        <DepositIcon />
        <Text style={styles.containerChildText}>Receive</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.containerChild}
        onPress={() => navigate(SCREENS.WITHDRAWAL)}>
        <WithdarawalIcon />
        <Text style={styles.containerChildTextWithdrawal}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionCards;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal:
      Platform.OS === 'ios' ? moderateScale(6) : moderateScale(6),
    marginTop: moderateScale(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerChild: {
    backgroundColor: '#192020',
    borderColor: '#192020',
    justifyContent: 'center',
    borderRadius: 24,
    width: '49%',
    height: verticalScale(90),
    padding: moderateScale(18),
  },
  containerChildText: {
    color: themeColors.aquaColor,
    fontSize: size.sl,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    marginTop: moderateScale(12),
  },
  containerChildTextWithdrawal: {
    color: themeColors.lightred,
    fontSize: size.sl,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    marginTop: moderateScale(12),
  },
});
