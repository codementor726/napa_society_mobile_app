import React from 'react';
import {SvgXml} from 'react-native-svg';

export const DoneIcon = () => {
  const xml = `<svg
  width="140"
  height="140"
  viewBox="0 0 140 140"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <circle cx="70" cy="70" r="70" fill="#181B1B" />
  <path
    d="M58 71.1429L65.2 78L82 62"
    stroke="#16E6EF"
    stroke-width="3"
    stroke-linecap="square"
    stroke-linejoin="round"
  />
</svg>
`;
  return <SvgXml xml={xml} />;
};
