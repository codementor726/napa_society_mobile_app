import React from 'react';
import {SvgXml} from 'react-native-svg';

type EthereumIconProps = {
  bgColor?: string;
  iconColor?: string;
  width?: number;
  height?: number;
};
export const EthereumIcon = ({
  bgColor,
  iconColor,
  width,
  height,
}: EthereumIconProps) => {
  const xml = `<svg width="${width ? width : 48}" height="${
    height ? height : 48
  }" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="24" fill=${bgColor ? bgColor : '#192020'}/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.2502 24.2081L24.1558 12.75V12.7554L24.1574 12.75L31.0619 24.2065L31.0655 24.2082L24.1599 28.2901V28.2889L24.1574 28.2904L24.1558 28.2888V28.2901V28.2904L17.25 24.2084L17.2501 24.2082L17.25 24.2082L17.2502 24.2081ZM24.1558 35.2452V35.25L17.25 25.5186L24.1558 29.5985V29.6005L24.1574 29.5985L31.0673 25.5186L24.1574 35.25L24.1558 35.2452Z" fill=${
    iconColor ? iconColor : 'white'
  }/>
</svg>
`;
  return <SvgXml xml={xml} />;
};
