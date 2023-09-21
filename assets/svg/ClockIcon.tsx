import React from 'react';
import { Svg, Path, G, Defs, Rect, ClipPath } from 'react-native-svg';

export const ClockIcon = () => {
    return (
        <Svg width="24" height="24" viewBox="0 0 20 20" strokeWidth= "2" fill="none">
            <G clip-path="url(#clip0_4393_8217)">
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M19.1662 10.0008C19.1662 15.064 15.0623 19.1679 9.9991 19.1679C4.93591 19.1679 0.832031 15.064 0.832031 10.0008C0.832031 4.93762 4.93591 0.83374 9.9991 0.83374C15.0623 0.83374 19.1662 4.93762 19.1662 10.0008Z" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                <Path d="M13.4003 12.9162L9.66406 10.6873V5.88379" stroke="white" stroke-width="1.4" stroke-linecap="square" stroke-linejoin="round" />
            </G>
            <Defs>
                <ClipPath id="clip0_4393_8217">
                    <Rect width="20" height="20" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    );
};













