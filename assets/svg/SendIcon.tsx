import React from 'react';
import {SvgXml} from 'react-native-svg';

type TetherIconProps = {
  bgColor?: string;
  iconColor?: string;
};

export const SendIcon = ({bgColor, iconColor}: TetherIconProps) => {
  const xml = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.76316 12.7368L2.6348 10.1727C1.0679 9.38922 1.19399 7.11274 2.83782 6.50712L16.4338 1.49806C18.0349 0.908207 19.5918 2.46514 19.0019 4.06616L13.9929 17.6622C13.3873 19.306 11.1108 19.4321 10.3273 17.8652L7.76316 12.7368ZM7.76316 12.7368L12.3947 8.10526" stroke="white" stroke-width="1.4" stroke-linejoin="round"/>
  </svg>
`;
  return <SvgXml xml={xml} />;
};
