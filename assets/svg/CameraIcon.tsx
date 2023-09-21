import React from 'react';
import {Path, Svg, G, SvgXml} from 'react-native-svg';

export const CameraIcon = () => {
  const xml = `<svg
  width="25"
  height="24"
  viewBox="0 0 25 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M2.00342 20H22.0034L22.0034 6H2.00347L2.00342 20Z"
    stroke="white"
    stroke-width="1.4"
    stroke-linecap="round"
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M12.0034 15C13.108 15 14.0034 14.1046 14.0034 13C14.0034 11.8954 13.108 11 12.0034 11C10.8988 11 10.0034 11.8954 10.0034 13C10.0034 14.1046 10.8988 15 12.0034 15Z"
    stroke="white"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path d="M3.00342 2H9.00342" stroke="white" stroke-width="1.4" />
</svg>
`;
  return <SvgXml xml={xml} />;
};
