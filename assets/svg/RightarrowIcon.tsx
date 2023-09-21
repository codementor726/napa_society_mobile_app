import React from 'react';
import {Path, Svg} from 'react-native-svg';

type RightarrowIconProps = {
  height?: number;
  width?: number;
};

export const RightarrowIcon: React.FC<RightarrowIconProps> = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 6L23 12L17 18"
        stroke="#677778"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
