
import React from 'react';
import { Svg, Line, Rect } from 'react-native-svg';

type CalenderIconMProps = {
color?: string;
}
export const CalenderIconM:React.FC<CalenderIconMProps> = ({color}) => {
    return (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
        <Rect x="2.5" y="4.16699" width="15" height="13.3333" rx="3" stroke={color?color:"#677778"} stroke-width="1.4"/>
        <Line x1="2.5" y1="9.3" x2="17.5" y2="9.3" stroke={color?color:"#677778"} stroke-width="1.4"/>
        <Line x1="6.53203" y1="1.66699" x2="6.53203" y2="6.66699" stroke={color?color:"#677778"} stroke-width="1.4"/>
        <Line x1="13.2" y1="1.66699" x2="13.2" y2="6.66699" stroke={color?color:"#677778"} stroke-width="1.4"/>
        </Svg>
        
    );
};
