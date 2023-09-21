import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {themeColors} from '../../theme/colors';

const RailSelected = () => <View style={styles.root} />;

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 5,
    backgroundColor: themeColors.aquaColor,
    borderRadius: 2,
  },
});
