import React from 'react';
import Svg, {Path} from 'react-native-svg';

type CurrencyIconProps = {
  bgColor?: string;
  iconColor?: string;
};
export const CurrencyIcon = ({bgColor, iconColor}: CurrencyIconProps) => {
  return (
    <Svg width={16} height={26} viewBox="0 0 16 26" fill="none">
      <Path
        d="M1 13L8 2l7 11M1 13l7 11 7-11M1 13l7-3.667L15 13M1 13l7 2.444L15 13"
        stroke="#fff"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </Svg>
  );
};
