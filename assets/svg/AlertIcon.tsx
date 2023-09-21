import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

type AlertIconProps = {
  color?: string;
 };
const  AlertIcon:React.FC<AlertIconProps>=({color})=> {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 11.333v3.334M6.666 25.333h18.667a2.667 2.667 0 002.453-3.666L18.32 5.333a2.667 2.667 0 00-4.667 0L4.186 21.667a2.667 2.667 0 002.334 3.666"
        stroke={color?color:"#FF4E51"}
        strokeWidth={1.4}
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <Path
        d="M16 19.333h.013"
        stroke={color?color:"#FF4E51"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default AlertIcon;
