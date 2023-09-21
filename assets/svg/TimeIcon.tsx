import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {G, Path, Svg} from 'react-native-svg';

export const TimeIcon: React.FC = () => {
  return (
    <Svg
      width={verticalScale(23)}
      height={verticalScale(20)}
      viewBox="0 0 24 24"
      fill="none">
      <G
        opacity={0.6}
        stroke="#677778"
        strokeWidth={1.4}
        strokeLinejoin="round">
        <Path
          clipRule="evenodd"
          d="M23 12.001c0 6.076-4.925 11-11.001 11s-11-4.924-11-11 4.924-11 11-11 11 4.924 11 11z"
          strokeLinecap="round"
        />
        <Path d="M16.08 15.5l-4.483-2.675V7.06" strokeLinecap="square" />
      </G>
    </Svg>
  );
};
