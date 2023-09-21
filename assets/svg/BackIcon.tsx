import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {Svg, Path} from 'react-native-svg';

type BackIconProps = {
  color?: string;
};

export const BackIcon: React.FC<BackIconProps> = ({color = 'white'}) => {
  return (
    <Svg
      width={verticalScale(15)}
      height={verticalScale(15)}
      viewBox="0 0 8 14"
      fill="none">
      <Path
        d="M7 1L1 7L7 13"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </Svg>
  );
};
