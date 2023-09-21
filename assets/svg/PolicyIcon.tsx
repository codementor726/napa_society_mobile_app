import React from 'react';
import {Path, Svg} from 'react-native-svg';

type PolicyIconProps = {
  height?: number;
  width?: number;
};
export const PolicyIcon = ({height, width}: PolicyIconProps) => {
  return (
    <Svg
      width={width ? width : 24}
      height={height ? height : 24}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        stroke="#fff"
        strokeWidth={1.4}
        d="M2.7 8.7H21.3V21.299999999999997H2.7z"
      />
      <Path d="M7 9V7a5 5 0 0110 0v2" stroke="#fff" strokeWidth={1.4} />
    </Svg>
  );
};
