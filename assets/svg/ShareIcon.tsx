import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {Svg, Path} from 'react-native-svg';

type ShareIconProps = {
  color?: string;
};

export const ShareIcon: React.FC<ShareIconProps> = ({color = 'white'}) => {
  return (
    <Svg
      width={verticalScale(20)}
      height={verticalScale(20)}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M12 3L17 8.14286M12 3L7 8.14286M12 3L12 15"
        stroke={color}
        stroke-width="1.4"
      />
      <Path d="M21 18V22L3 22L3 18" stroke={color} stroke-width="1.4" />
    </Svg>
  );
};
