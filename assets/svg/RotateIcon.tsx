import React from 'react';
import {SvgXml} from 'react-native-svg';

export const RotateIcon = () => {
  const xml = `<svg
  width="22"
  height="22"
  viewBox="0 0 22 22"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M3.00439 4.99902C4.82885 2.57069 7.7332 1 11.0044 1C16.5272 1 21.0044 5.47715 21.0044 11L17.0044 9M19.0044 17.001C18.4358 17.7578 17.7622 18.4314 17.0054 19C15.3339 20.2558 13.256 21 11.0044 21C5.48155 21 1.00439 16.5228 1.00439 11L5.00439 13"
    stroke="white"
    stroke-width="1.4"
    stroke-linecap="square"
    stroke-linejoin="round"
  />
</svg>
`;
  return <SvgXml xml={xml} />;
};
