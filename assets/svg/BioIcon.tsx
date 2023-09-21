import React from 'react';
import {SvgXml} from 'react-native-svg';

export const BioIcon = () => {
  const xml = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.99219 5L17.9922 5" stroke="white" stroke-width="1.4" stroke-linecap="square"/>
  <path d="M3.99219 12L13.9922 12" stroke="white" stroke-width="1.4" stroke-linecap="square"/>
  <path d="M3.99219 19L21.9922 19" stroke="white" stroke-width="1.4" stroke-linecap="square"/>
  </svg>
`;
  return <SvgXml xml={xml} />;
};
