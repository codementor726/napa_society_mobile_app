import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {Svg, Path} from 'react-native-svg';
type HeartIconProps = {
  color?: string;
  fill?: string;
};
export const HeartIcon: React.FC<HeartIconProps> = ({
  color = 'white',
  fill,
}: any) => {
  return (
    <Svg
      width={verticalScale(18)}
      height={verticalScale(16)}
      viewBox="0 0 18 16"
      fill={fill}>
      <Path
        d="M15.3434 2.51208C14.9768 2.13837 14.5417 1.84193 14.0627 1.63967C13.5837 1.43741 13.0704 1.33331 12.5519 1.33331C12.0335 1.33331 11.5201 1.43741 11.0411 1.63967C10.5621 1.84193 10.127 2.13837 9.76046 2.51208L8.99981 3.28728L8.23916 2.51208C7.49882 1.75758 6.4947 1.3337 5.44771 1.3337C4.40071 1.3337 3.39659 1.75758 2.65626 2.51208C1.91592 3.26658 1.5 4.2899 1.5 5.35692C1.5 6.42394 1.91592 7.44726 2.65626 8.20176L3.41691 8.97696L8.99981 14.6666L14.5827 8.97696L15.3434 8.20176C15.71 7.82823 16.0009 7.38474 16.1994 6.89661C16.3979 6.40848 16.5 5.88529 16.5 5.35692C16.5 4.82855 16.3979 4.30535 16.1994 3.81723C16.0009 3.3291 15.71 2.8856 15.3434 2.51208V2.51208Z"
        stroke={color}
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
