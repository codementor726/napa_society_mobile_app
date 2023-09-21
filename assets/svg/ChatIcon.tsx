import * as React from 'react';
import {verticalScale} from 'react-native-size-matters';
import Svg, {Path} from 'react-native-svg';
type ChatIconProps = {
color?: string;
}
const  ChatIcon:React.FC<ChatIconProps>=({color})=> {
  return (
    <Svg
      width={verticalScale(20)}
      height={verticalScale(16)}
      viewBox="0 0 20 20"
      fill="none">
      <Path
        d="M19.3 10a9.3 9.3 0 01-9.3 9.3H1.69l.32-.32c1.073-1.073.985-2.716.237-3.841A9.253 9.253 0 01.7 10a9.3 9.3 0 1118.6 0z"
        stroke={color? color: "#fff"}
        strokeWidth={1.4}
      />
    </Svg>
  );
}

export default ChatIcon;
