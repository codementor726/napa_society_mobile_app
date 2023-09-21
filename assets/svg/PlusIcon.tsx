import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {themeColors} from '../../theme/colors';
import {verticalScale} from 'react-native-size-matters';

export const PlusIcon = () => {
  return (
    <Svg
      width={verticalScale(20)}
      height={verticalScale(20)}
      viewBox="0 0 12 12"
      fill="none">
      <Path
        d="M6 2V10"
        stroke={themeColors.garyColor}
        stroke-linecap="square"
      />
      <Path
        d="M10 6L2 6"
        stroke={themeColors.garyColor}
        stroke-linecap="square"
      />
    </Svg>
  );
};
