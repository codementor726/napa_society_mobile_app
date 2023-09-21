import React from 'react';
import {Path, Svg} from 'react-native-svg';

type TermIconProp = {
  height?: number;
  width?: number;
};

export const TermIcon: React.FC<TermIconProp> = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 21H8C6.34315 21 5 19.6569 5 18V7V6C5 4.34315 6.34315 3 8 3H12.7574C13.553 3 14.3161 3.31607 14.8787 3.87868L18.1213 7.12132C18.6839 7.68393 19 8.44699 19 9.24264V18C19 19.6569 17.6569 21 16 21Z"
        stroke="white"
        stroke-width="1.4"
      />
      <Path d="M8 10H16" stroke="white" stroke-width="1.4" />
      <Path d="M8 14H13" stroke="white" stroke-width="1.4" />
    </Svg>
  );
};
