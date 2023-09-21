import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

type CrossIconProps = {
  color?: string;
  width?: number;
  height?: number;
  opacity?: number;
};
export const LightCrossIcon: React.FC<CrossIconProps> = ({
  color = '#fff',
  width = 33,
  height = 32,
  opacity = 0.5,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 33 32" fill="none">
      <G opacity={opacity} stroke={color} strokeWidth={2} strokeLinecap="square">
        <Path d="M24.003 8l-16 16M8.003 8l16 16" />
      </G>
    </Svg>
  );
};
