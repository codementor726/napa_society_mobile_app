import React from 'react';
import {SvgXml} from 'react-native-svg';

type TetherIconProps = {
  bgColor?: string;
  iconColor?: string;
};

export const GrayAddIcon = ({bgColor, iconColor}: TetherIconProps) => {
  const xml = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 9H9M0 9H9M9 9V0M9 9V18" stroke="white" stroke-width="1.4"/>
</svg>

`;
  return <SvgXml xml={xml} />;
};