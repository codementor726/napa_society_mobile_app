import React from 'react';
import {SvgXml} from 'react-native-svg';
export const EyeIcon = ({width = 24, height = 24}: any) => {
  const xml = `<svg width=${width} height=${height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 11.9999C1 11.9999 5 3.99988 12 3.99988C19 3.99988 23 11.9999 23 11.9999C23 11.9999 19 19.9999 12 19.9999C5 19.9999 1 11.9999 1 11.9999Z" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
    </svg>    
  `;
  return <SvgXml xml={xml} />;
};
