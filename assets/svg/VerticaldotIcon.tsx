import React from 'react'
import { SvgXml } from 'react-native-svg';

export const VerticaldotIcon = () => {
    const xml = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.5">
    <circle cx="8.7" cy="4.7" r="0.7" fill="#677778" stroke="#677778" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="8.7" cy="11.7" r="0.7" fill="#677778" stroke="#677778" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="8.7" cy="18.7" r="0.7" fill="#677778" stroke="#677778" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="14.7" cy="4.7" r="0.7" fill="#677778" stroke="#677778" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="14.7" cy="11.7" r="0.7" fill="#677778" stroke="#677778" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="14.7" cy="18.7" r="0.7" fill="#677778" stroke="#677778" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    </svg>
    
`;
    return <SvgXml xml={xml} />;
}

    