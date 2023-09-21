import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {Svg, Path} from 'react-native-svg';

type ImportIconProps = {
  height?: number;
  width?: number;
  color?: string;
};

export const ImportIcon = ({height, width, color}: ImportIconProps) => {
  return (
    <Svg
      width={width ? width : verticalScale(20)}
      height={height ? height : verticalScale(20)}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M20 15L20 20H4L4.00002 15"
        stroke={color ? color : '#16E6EF'}
        stroke-width="1.4"
        stroke-linecap="square"
      />
      <Path
        d="M12 5L12 14"
        stroke={color ? color : '#16E6EF'}
        stroke-width="1.4"
        stroke-linecap="square"
      />
      <Path
        d="M12 15L8.5 11.5"
        stroke={color ? color : '#16E6EF'}
        stroke-width="1.4"
        stroke-linecap="square"
      />
      <Path
        d="M12 15L15.5 11.5"
        stroke={color ? color : '#16E6EF'}
        stroke-width="1.4"
        stroke-linecap="square"
      />
    </Svg>
  );
};
