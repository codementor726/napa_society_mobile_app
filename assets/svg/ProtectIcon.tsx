import React from 'react';
import {Path, Svg} from 'react-native-svg';

type ProtectIconProp = {
  height?: number;
  width?: number;
};

export const ProtectIcon: React.FC<ProtectIconProp> = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.11525 3.8163L11.1152 2.27307C11.6917 2.09517 12.3083 2.09517 12.8848 2.27307L17.8848 3.8163C19.1423 4.20443 20 5.36532 20 6.68137V13.3579C20 18.2702 14.9339 20.837 12.8647 21.6806C12.306 21.9083 11.694 21.9083 11.1353 21.6806C9.06614 20.837 4 18.2702 4 13.3579V6.68137C4 5.36532 4.85773 4.20443 6.11525 3.8163Z"
        stroke="white"
        stroke-width="1.4"
      />
    </Svg>
  );
};
