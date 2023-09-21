import React from 'react';
import { G, Path, Rect, Svg } from 'react-native-svg';
import {View} from 'react-native';
export const MoreIcon = () => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <G opacity="0.5">
                <Rect x="4" y="10" width="4" height="4" rx="2" fill="#677778" />
                <Rect x="16" y="10" width="4" height="4" rx="2" fill="#677778" />
            </G>
        </Svg>
    );
};
