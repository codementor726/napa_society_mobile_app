import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {G, Path, Svg} from 'react-native-svg';

type WalletIconProps = {
  color: string;
  opacity: number;
};

export const WalletIcon: React.FC<WalletIconProps> = ({color, opacity}) => {
  return (
    <Svg
      width={verticalScale(22)}
      height={verticalScale(22)}
      viewBox="0 0 22 20"
      fill="none">
      <G opacity={opacity}>
        <Path
          d="M18 8H2V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V12C22 9.79086 20.2091 8 18 8ZM15 14.5C15 15.8783 16.1202 17 17.4989 17C18.8765 17 19.9977 15.8783 19.9977 14.5C19.9977 13.1217 18.8765 12 17.4989 12C16.1202 12 15 13.1217 15 14.5Z"
          fill={color}
        />
        <Path
          d="M2 6H16.5C17.3284 6 18 5.32843 18 4.5C18 3.67157 17.3284 3 16.5 3H5C3.34315 3 2 4.34315 2 6Z"
          fill={color}
        />
      </G>
    </Svg>
  );
};
