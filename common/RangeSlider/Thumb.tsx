import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {themeColors} from '../../theme/colors';
import {ToggleIcon} from '../../assets/svg/ToggleIcon';

const THUMB_RADIUS = 15;

const Thumb = ({color}: any) => {
  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: color ? color : themeColors.aquaColor,
          borderColor: color ? color : themeColors.aquaColor,
          shadowColor: color ? color : themeColors.aquaColor,
        },
      ]}>
      <ToggleIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 1,
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.16,
    shadowRadius: 6,
  },
});

export default memo(Thumb);
