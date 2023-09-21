import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {G, Path, Svg} from 'react-native-svg';

type HomeIconProps = {
  color: string;
  opacity: number;
};

export const HomeIcon: React.FC<HomeIconProps> = ({color, opacity}) => {
  return (
    <Svg
      width={verticalScale(22)}
      height={verticalScale(22)}
      viewBox="0 0 22 20"
      fill="none">
      <G opacity={opacity}>
        <Path
          d="M19.8319 6.01002L13.2819 0.770018C12.0019 -0.249982 10.0019 -0.259982 8.73192 0.760018L2.18192 6.01002C1.24192 6.76002 0.671916 8.26002 0.871916 9.44002L2.13192 16.98C2.42192 18.67 3.99192 20 5.70192 20H16.3019C17.9919 20 19.5919 18.64 19.8819 16.97L21.1419 9.43002C21.3219 8.26002 20.7519 6.76002 19.8319 6.01002ZM11.7519 16C11.7519 16.41 11.4119 16.75 11.0019 16.75C10.5919 16.75 10.2519 16.41 10.2519 16V13C10.2519 12.59 10.5919 12.25 11.0019 12.25C11.4119 12.25 11.7519 12.59 11.7519 13V16Z"
          fill={color}
        />
      </G>
    </Svg>
  );
};
