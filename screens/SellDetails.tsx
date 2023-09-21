import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';

const SellDetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.leftText}>Contract Address</Text>
        <Text style={styles.rightText}>1z7Hga0jH7Tg9i2...M9aYh</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.leftText}>Etherscan Address</Text>
        <Text style={styles.rightText}>0sYto2JKn2yhR72K...aRD71</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.leftText}>Views</Text>
        <Text style={styles.rightText}>8371</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.leftText}>Token Standart</Text>
        <Text style={styles.rightText}>ERC-928</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.leftText}>Blockchain</Text>
        <Text style={styles.rightText}>NAPA</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.leftText}>Last Updated</Text>
        <Text style={styles.rightText}>5 sec ago</Text>
      </View>
    </View>
  );
};

export default SellDetails;

const styles = StyleSheet.create({
  rightText: {
    color: 'white',
    fontSize: 14,
    fontFamily: Fontfamily.Avenier,
  },
  leftText: {
    color: themeColors.garyColor,
    fontSize: 14,
    fontFamily: Fontfamily.Avenier,
    flex: 1,
  },
  detailContainer: {
    flexDirection: 'row',
    marginTop: 14,
  },
  container: {
    marginTop: 6,
    marginHorizontal: 24,
  },
});
