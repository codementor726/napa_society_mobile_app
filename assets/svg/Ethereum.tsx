import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {Svg, Path, Circle} from 'react-native-svg';

export const Ethereum = () => {
  return (
    <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.625 22.381l12.66-21.006v.01l.004-.01 12.658 21.004.006.003-12.66 7.483v-.002l-.004.003-.003-.003v.002L9.625 22.383zm12.66 20.235v.009l-12.66-17.84 12.66 7.479v.003l.004-.003 12.668-7.48-12.668 17.841-.003-.009z"
        fill="#16E6EF"
      />
    </Svg>
  );
};
