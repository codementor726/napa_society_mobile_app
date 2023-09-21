import React from 'react';
import {Ellipse, Path, Svg} from 'react-native-svg';

type InviteIcon = {
  height?: number;
  width?: number;
  color?: string;
  strokeWidth?: any;
};

export const InviteIcon: React.FC<InviteIcon> = ({
  color,
  strokeWidth,
  width,
  height,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Ellipse
        cx="9.24761"
        cy="10.5417"
        rx="3.66558"
        ry="3.66667"
        stroke={color ? color : 'white'}
        stroke-width="1.4"
      />
      <Path
        d="M16.5803 21.5443C16.5803 17.4942 13.298 14.2109 9.24913 14.2109C5.20024 14.2109 1.91797 17.4942 1.91797 21.5443"
        stroke={color ? color : 'white'}
        stroke-width={strokeWidth ? strokeWidth : '1.9'}
      />
      <Path
        d="M18 1V5M18 9V5M18 5H22H14"
        stroke={color ? color : 'white'}
        stroke-width={strokeWidth ? strokeWidth : '1.4'}
      />
    </Svg>
  );
};
