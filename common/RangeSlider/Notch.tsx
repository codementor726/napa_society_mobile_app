//@ts-nocheck
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {themeColors} from '../../theme/colors';

const Notch = props => <View style={[styles.root, {...props}]} />;

export default memo(Notch);

const styles = StyleSheet.create({
  root: {
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: themeColors.aquaColor,
  },
});
