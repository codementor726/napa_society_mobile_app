import React from 'react';
import {Path, Svg} from 'react-native-svg';

type MintProps = {
  color?: string;
  fill?: string;
};

export const MintIcon: React.FC<MintProps> = ({
  color = 'white',
  fill = 'none',
}) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill={fill}>
      <Path
        d="M8.60122 8.59969L10.0012 2.99969L11.4012 8.59969L17.0012 9.99969L11.4012 11.3997L10.0012 16.9997L8.60122 11.3997L3.00122 9.99969L8.60122 8.59969Z"
        stroke={color}
        stroke-width="1.4"
        stroke-miterlimit="5.13597"
      />
    </Svg>
  );
};
