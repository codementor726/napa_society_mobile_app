import React from 'react';
import {Svg, Path} from 'react-native-svg';

type CrossIconProps = {
  color?: string;
  width?: number;
  height?: number;
};
export const CrossIcon: React.FC<CrossIconProps> = ({
  color = 'white',
  width = 25,
  height = 25,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
      <Path
        d="M9 3L3 9"
        stroke={color}
        stroke-width="1.4"
        stroke-linecap="square"
      />
      <Path
        d="M3 3L9 9"
        stroke={color}
        stroke-width="1.4"
        stroke-linecap="square"
      />
    </Svg>
  );
};
