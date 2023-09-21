
import React from 'react';
import { Svg, Path, Circle, Ellipse } from 'react-native-svg';

export const FilterIcon = () => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" stroke="white" stroke-width="2" fill="none">
            <Circle cx="13.9995" cy="6" r="3" stroke="white" stroke-width="2" />
            <Ellipse cx="9" cy="18" rx="3" ry="3" transform="rotate(-180 9 18)" stroke="white" stroke-width="1.4" />
            <Path d="M21.9995 6L16.9995 6" stroke="white" stroke-width="1.4" stroke-linejoin="round" />
            <Path d="M2 18L6 18" stroke="white" stroke-width="1.4" stroke-linejoin="round" />
            <Path d="M7.99951 6L1.99951 6" stroke="white" stroke-width="1.4" stroke-linejoin="round" />
            <Path d="M15.0005 18H22.0005" stroke="white" stroke-width="1.4" stroke-linejoin="round" />
        </Svg>

    );
};





