import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

type AccountIconProps = {
  bgColor?: string;
  iconColor?: string;
};
export const AccountIcon = ({bgColor, iconColor}: AccountIconProps) => {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill={'none'}>
      <Circle cx={24} cy={24} r={24} fill={bgColor ? bgColor : '#181B1B'} />
      <Circle
        cx={24}
        cy={20}
        r={5.3}
        stroke={iconColor ? iconColor : '#fff'}
        strokeWidth={1.4}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.6 34H34c0-4.97-4.477-9-10-9s-10 4.03-10 9h1.4c0-4.062 3.708-7.6 8.6-7.6 4.892 0 8.6 3.538 8.6 7.6z"
        fill={iconColor ? iconColor : '#fff'}
      />
    </Svg>
  );
};
