import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {Svg, Path} from 'react-native-svg';

export const ForwardIcon = () => {
  return (
    <Svg
      width={moderateScale(8)}
      height={moderateScale(15)}
      viewBox="0 0 6 10"
      fill="none">
      <Path
        d="M1 9L5 5L1 1"
        stroke="#677778"
        stroke-width="1.4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
