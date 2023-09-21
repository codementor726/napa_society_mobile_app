import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {Path, Svg, Circle} from 'react-native-svg';

type SearchProps = {
  color?: string;
};

export const Search: React.FC<SearchProps> = ({color = 'white'}) => {
  return (
    <Svg
      width={verticalScale(20)}
      height={verticalScale(20)}
      viewBox="0 0 24 24"
      fill="none">
      <Circle cx={11} cy={11} r={8.3} stroke={color} strokeWidth={1.4} />
      <Path
        d="M21 21L17 17"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
