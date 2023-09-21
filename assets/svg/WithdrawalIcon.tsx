import React from 'react';
import {Path, Svg} from 'react-native-svg';

type WithdarawalIconProps = {
  height?: number;
  width?: number;
};

export const WithdarawalIcon = ({height, width}: WithdarawalIconProps) => {
  return (
    <Svg
      width={width ? width : 38}
      height={height ? height : 38}
      viewBox="0 0 32 32"
      fill="none">
      <Path
        d="M29.3333 16C29.3333 23.36 23.36 29.3333 16 29.3333C8.64 29.3333 2.66667 23.36 2.66667 16C2.66667 8.64 8.64 2.66667 16 2.66667"
        stroke="#FF4E51"
        strokeWidth={1.4}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <Path
        d="M28.6333 8.00001V8.70001H30.0333V8.00001H28.6333ZM29.3333 2.66667H30.0333C30.0333 2.28007 29.7199 1.96667 29.3333 1.96667V2.66667ZM24 1.96667C23.6134 1.96667 23.3 2.28007 23.3 2.66667C23.3 3.05327 23.6134 3.36667 24 3.36667V1.96667ZM30.0333 8.00001V2.66667H28.6333V8.00001H30.0333ZM29.3333 1.96667H24V3.36667H29.3333V1.96667Z"
        fill="#FF4E51"
        // fill="#16E6EF"
      />
      <Path
        d="M22.6667 9.33334L28.9987 3.00005"
        stroke="#FF4E51"
        strokeWidth={1.4}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
