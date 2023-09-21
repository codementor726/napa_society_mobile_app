import React from 'react';
import {Path, Svg} from 'react-native-svg';
const PauseIcon = () => {
  return (
    <Svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 18V6C18 4.89543 17.1046 4 16 4C14.8954 4 14 4.89543 14 6V18C14 19.1046 14.8954 20 16 20C17.1046 20 18 19.1046 18 18Z"
        fill="white"
      />
      <Path
        d="M10 18V6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20C9.10457 20 10 19.1046 10 18Z"
        fill="white"
      />
    </Svg>
  );
};

export default PauseIcon;
