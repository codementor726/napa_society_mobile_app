import React from 'react';
import {Path, Svg} from 'react-native-svg';

type DepositIconProps = {
  height?: number;
  width?: number;
};
export const DepositIcon = ({height, width}: DepositIconProps) => {
  return (
    <Svg
      width={width ? width : 38}
      height={height ? height : 38}
      viewBox="0 0 32 32"
      fill="none">
      <Path
        d="M29.3333 16C29.3333 23.36 23.36 29.3333 16 29.3333C8.64 29.3333 2.66667 23.36 2.66667 16C2.66667 8.64 8.64 2.66667 16 2.66667"
        stroke="#16E6EF"
        strokeWidth={1.5}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <Path
        d="M23.4167 4C23.4167 3.58579 23.0809 3.25 22.6667 3.25C22.2525 3.25 21.9167 3.58579 21.9167 4H23.4167ZM22.6667 9.33333H21.9167C21.9167 9.74755 22.2525 10.0833 22.6667 10.0833V9.33333ZM28 10.0833H28.75V8.58333H28V10.0833ZM21.9167 4V9.33333H23.4167V4H21.9167ZM22.6667 10.0833H28V8.58333H22.6667V10.0833Z"
        fill="#16E6EF"
      />
      <Path
        d="M29.8637 3.197L30.394 2.66667L29.3333 1.60601L28.803 2.13634L29.8637 3.197ZM22.1363 8.80301C21.8434 9.0959 21.8434 9.57078 22.1363 9.86367C22.4292 10.1566 22.9041 10.1566 23.197 9.86367L22.1363 8.80301ZM28.803 2.13634L22.1363 8.80301L23.197 9.86367L29.8637 3.197L28.803 2.13634Z"
        fill="#16E6EF"
      />
    </Svg>
  );
};
