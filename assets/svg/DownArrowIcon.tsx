import React from 'react';
import {SvgXml} from 'react-native-svg';

export const DownArrowIcon = () => {
  const xml = `<svg
  width="10"
  height="6"
  viewBox="0 0 10 6"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M1 1L5 5L9 1"
    stroke="#677778"
    stroke-width="1.4"
    stroke-linecap="square"
    stroke-linejoin="round"
  />
</svg>
`;
  return <SvgXml xml={xml} />;
};
