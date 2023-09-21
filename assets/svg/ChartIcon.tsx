import React from 'react';
import { verticalScale } from 'react-native-size-matters';
import { Path, Svg } from 'react-native-svg';

export const ChartIcon = () => {
  return (
    <Svg width={verticalScale(196)} height={verticalScale(100)} viewBox="0 0 202 82" fill="none">
      <Path d="M201 10L196.593 17L189.814 10L185.068 15L176.932 5L171.508 10L164.051 1L157.949 7L151.169 14L139.644 16L134.898 22L128.119 12L122.695 38L113.881 35L109.136 40L101.678 30L94.8983 40L88.1186 35L75.2373 63L68.4576 46L62.3559 54L56.9322 49L50.8305 59L43.3729 43L37.2712 59L29.8136 50L25.0678 55L16.9322 44L1 81" stroke="#16E6EF" />
    </Svg>
  );
};


