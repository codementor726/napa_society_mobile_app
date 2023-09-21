import React from 'react';
import {SvgXml} from 'react-native-svg';
export const CopyIcon = () => {
  const xml = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2H5C3.34315 2 2 3.34315 2 5V13C2 14.6569 3.34315 16 5 16H13C14.6569 16 16 14.6569 16 13V5C16 3.34315 14.6569 2 13 2Z" stroke="white" stroke-width="1.4"/>
    <path d="M19 8V8C20.6569 8 22 9.34315 22 11V19C22 20.6569 20.6569 22 19 22H11C9.34315 22 8 20.6569 8 19V19" stroke="white" stroke-width="1.4"/>
    </svg>
`;
  return <SvgXml xml={xml} />;
};
