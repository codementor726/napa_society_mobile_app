import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {Path, Svg} from 'react-native-svg';
type NotificationIconProps = {
  width?: number;
  height?: number;
  color?: string;
};
export const NotificationIcon: React.FC<NotificationIconProps> = ({
  width,
  height,
  color = 'white',
}) => {
  return (
    <Svg
      width={width ? width : verticalScale(25)}
      height={height ? height : verticalScale(20)}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M3.82632 18.3L4.68963 13.1202L5.6154 8.02844C6.17641 4.94285 8.86382 2.7 12 2.7C15.1362 2.7 17.8236 4.94285 18.3846 8.02844L19.3104 13.1202L20.1737 18.3H3.82632Z"
        stroke={color}
        strokeWidth={1.4}
      />
      <Path
        d="M10 21H14"
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
    </Svg>
  );
};
