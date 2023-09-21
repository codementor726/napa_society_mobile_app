import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {Svg, Path} from 'react-native-svg';

export const CommentIcon = () => {
  return (
    <Svg
      width={verticalScale(16)}
      height={verticalScale(16)}
      viewBox="0 0 18 18"
      fill="none">
      <Path
        d="M17.3 9C17.3 13.584 13.584 17.3 9 17.3H1.68995L1.7168 17.2731C2.79098 16.199 2.69489 14.5603 1.98052 13.4313C1.16954 12.1495 0.7 10.6307 0.7 9C0.7 4.41604 4.41604 0.7 9 0.7C13.584 0.7 17.3 4.41604 17.3 9ZM1.34853 17.6414L1.34898 17.641C1.34883 17.6411 1.34868 17.6413 1.34853 17.6414L1.20711 17.5L1.34853 17.6414Z"
        stroke="white"
        stroke-width="1.4"
      />
    </Svg>
  );
};
