import React from 'react';
import {SvgXml} from 'react-native-svg';

type TetherIconProps = {
  bgColor?: string;
  iconColor?: string;
  width?: number;
  height?: number;
};

export const TetherIcon = ({
  bgColor,
  iconColor,
  width,
  height,
}: TetherIconProps) => {
  const xml = `<svg width="${width ? width : 48}" height="${
    height ? height : 48
  }" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="24" fill=${bgColor ? bgColor : '#192020'}/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M26.1364 24.6481C26.0171 24.657 25.4006 24.6938 24.0254 24.6938C22.9316 24.6938 22.155 24.661 21.8825 24.6481C17.6555 24.4621 14.5003 23.7263 14.5003 22.8453C14.5003 21.9643 17.6555 21.2295 21.8825 21.0405V23.9152C22.1589 23.9351 22.9504 23.9819 24.0442 23.9819C25.3568 23.9819 26.0141 23.9272 26.1324 23.9162V21.0425C30.3505 21.2305 33.4987 21.9663 33.4987 22.8453C33.4987 23.7243 30.3515 24.4602 26.1324 24.6471L26.1364 24.6481ZM26.1364 20.7452V18.1728H32.023V14.25H15.9959V18.1728H21.8815V20.7442C17.0976 20.964 13.5 21.9116 13.5 23.0472C13.5 24.1827 17.0976 25.1294 21.8815 25.3501V33.5934H26.1354V25.3471C30.9084 25.1274 34.5 24.1807 34.5 23.0462C34.5 21.9116 30.9113 20.965 26.1354 20.7442L26.1364 20.7452Z" fill=${
    iconColor ? iconColor : 'white'
  }/>
</svg>
`;
  return <SvgXml xml={xml} />;
};
