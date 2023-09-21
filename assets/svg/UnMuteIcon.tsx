import React from 'react';
import {Path, Svg} from 'react-native-svg';

export const UnMuteIcon = ({color}: any) => {
  return (
    <Svg width="25" height="25" viewBox="0 0 24 24" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 6.11788C12 5.27295 11.017 4.80883 10.3646 5.3457L6.7213 8.34361C6.54231 8.4909 6.31771 8.57143 6.08591 8.57143H3C2.44772 8.57143 2 9.01914 2 9.57143V14.4286C2 14.9809 2.44772 15.4286 3 15.4286H6.08591C6.31771 15.4286 6.54231 15.5091 6.7213 15.6564L10.3646 18.6543C11.017 19.1912 12 18.727 12 17.8821V6.11788Z"
        fill={color}
      />
      <Path
        d="M15 8C17.6667 10.2093 17.6667 13.7907 15 16"
        stroke={color}
        stroke-width="2"
        stroke-linejoin="round"
      />
      <Path
        d="M18 5C22 8.86634 22 15.1337 18 19"
        stroke={color}
        stroke-width="2"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
