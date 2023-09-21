import React from 'react';
import {Path, Svg} from 'react-native-svg';

type SupportIconProp = {
  height?: number;
  width?: number;
};

export const SupportIcon: React.FC<SupportIconProp> = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 16.6V11C2 9.34315 3.34315 8 5 8H13C14.6569 8 16 9.34315 16 11V12.5V16C16 17.6569 14.6569 19 13 19H11.7016C11.2474 19 10.8068 19.1546 10.4522 19.4383L7.59259 21.7259C6.95077 22.2394 6 21.7824 6 20.9605V20.6C6 19.7163 5.28366 19 4.4 19C3.07452 19 2 17.9255 2 16.6Z"
        stroke="white"
        stroke-width="1.4"
      />
      <Path
        d="M19 12V12C20.6569 12 22 10.6569 22 9V5C22 3.34315 20.6569 2 19 2H11C9.34315 2 8 3.34315 8 5V5"
        stroke="white"
        stroke-width="1.4"
      />
    </Svg>
  );
};
