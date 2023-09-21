import React from 'react';
import {Path, Svg} from 'react-native-svg';

type LogoutIconProp = {
  height?: number;
  width?: number;
};

export const LogoutIcon: React.FC<LogoutIconProp> = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 3H7C5.34315 3 4 4.34315 4 6V18C4 19.6569 5.34315 21 7 21H15"
        stroke="#FF4E51"
        stroke-width="1.4"
        stroke-linecap="square"
      />
      <Path
        d="M12 12H22M22 12L18 8M22 12L18 16"
        stroke="#FF4E51"
        stroke-width="1.4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
