import React from 'react';
import {Svg, Rect} from 'react-native-svg';

export const DoubleDotIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="10" width="4" height="4" rx="2" fill="white" />
      <Rect x="16" y="10" width="4" height="4" rx="2" fill="white" />
    </Svg>
  );
};
