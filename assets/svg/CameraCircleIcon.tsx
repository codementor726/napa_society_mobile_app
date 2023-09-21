import React from 'react';
import {SvgXml} from 'react-native-svg';

export const CameraCircleIcon = () => {
  const xml = `<svg
  width="61"
  height="60"
  viewBox="0 0 61 60"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <rect x="3.00342" y="3" width="54" height="54" rx="27" fill="white" />
  <rect x="0.503418" y="0.5" width="59" height="59" rx="29.5" stroke="white" />
</svg>
`;
  return <SvgXml xml={xml} />;
};
