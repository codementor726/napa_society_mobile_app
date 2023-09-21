
import React from 'react'
import { SvgXml } from 'react-native-svg';
export const DeleteIcon = () => {
    const xml = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5L7 22H17L19 5" stroke="#FF4E51" stroke-width="1.4"/>
    <path d="M9 2H15" stroke="#FF4E51" stroke-width="1.4"/>
    <path d="M3 5L21 5" stroke="#FF4E51" stroke-width="1.4" stroke-linejoin="round"/>
    </svg>
    `;
    return <SvgXml xml={xml} />;
}

