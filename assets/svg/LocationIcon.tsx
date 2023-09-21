
import React from 'react';
import { verticalScale } from 'react-native-size-matters';
import { Path, Svg } from 'react-native-svg';

export const LocationIcon = () => {
    return (
        <Svg width={verticalScale(12)} height={verticalScale(16)} viewBox="0 0 12 16" fill="none">
            <Path d="M11.25 6.83331C11.25 10.9166 6 14.4166 6 14.4166C6 14.4166 0.75 10.9166 0.75 6.83331C0.75 5.44093 1.30312 4.10557 2.28769 3.121C3.27226 2.13644 4.60761 1.58331 6 1.58331C7.39239 1.58331 8.72774 2.13644 9.71231 3.121C10.6969 4.10557 11.25 5.44093 11.25 6.83331Z" stroke="white" stroke-width="1.4" stroke-linecap="round" />
        </Svg>
    );
};



