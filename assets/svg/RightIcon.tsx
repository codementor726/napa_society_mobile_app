import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';

import Svg, {Path} from 'react-native-svg';

type RightIconProps = {
  height?: any;
  width?: any;
  color?: string;
  strokeWidth?: number;
};

export const RightIcon: React.FC<RightIconProps> = ({height, width,color,strokeWidth}) => {
  return (
    <Svg
      width={width ? moderateScale(width) : moderateScale(20)}
      height={height ? moderateScale(height) : moderateScale(15)}
      viewBox="0 0 20 15"
      fill="none">
      <Path
        d="M2 8.857L6.8 14 18 2"
        stroke={color ? color : '#16E6EF'}
        strokeWidth={strokeWidth ? strokeWidth : 2}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
