import React from 'react';
import {Circle, Ellipse, Path, Svg} from 'react-native-svg';

type RefernceaquaIconProps = {
  height?: number;
  width?: number;
};

export const RefernceaquaIcon: React.FC<RefernceaquaIconProps> = () => {
  return (
    <Svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      <Circle cx="70" cy="70" r="70" fill="#16E6EF" />
      <Ellipse
        cx="62.6606"
        cy="64.111"
        rx="9.77488"
        ry="9.77778"
        stroke="black"
        stroke-width="3"
      />
      <Path
        d="M82.2138 93.4513C82.2138 82.6511 73.461 73.8958 62.664 73.8958C51.867 73.8958 43.1143 82.6511 43.1143 93.4513"
        stroke="black"
        stroke-width="3"
      />
      <Path
        d="M85.9997 38.6667V49.3334M85.9997 60.0001V49.3334M85.9997 49.3334H96.6663H75.333"
        stroke="black"
        stroke-width="3"
      />
    </Svg>
  );
};
