import React from 'react';
import {Defs, LinearGradient, Rect, Svg} from 'react-native-svg';

export const MarketDetailBackGround = () => {
  return (
    <Svg width="375" height="480" viewBox="0 0 375 480" fill="none">
      <Rect width="375" height="480" fill="url(#paint0_linear_4393_8320)" />
      <Defs>
        <LinearGradient
          id="paint0_linear_4393_8320"
          x1="187.5"
          y1="0"
          x2="187.5"
          y2="480"
          gradientUnits="userSpaceOnUse">
          <stop offset="0.524622" stop-color="#0A1313" stop-opacity="0" />
          <stop offset="1" stop-color="#0A1313" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
