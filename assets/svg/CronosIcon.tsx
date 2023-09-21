import React from 'react';
import {SvgXml} from 'react-native-svg';

type CronosIconProps = {
  bgColor?: string;
  iconColor?: string;
};

export const CronosIcon = ({bgColor, iconColor}: CronosIconProps) => {
  const xml = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="24" fill=${bgColor ? bgColor : '#192020'}/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.528 33.234H29.516L34.5 24.526L30.832 21.754L27.612 23.854V27.578L25.148 29.93V31.05L27.528 33.234ZM21.648 23.854L21.284 27.354H23.972H26.716L26.38 23.854L27.556 20.718H20.444L21.648 23.854ZM20.528 33.262L22.908 31.05V29.93L20.444 27.578V23.854L17.196 21.782L13.5 24.526L18.512 33.262H20.528ZM29.488 14.25H18.484L17.196 19.85H30.804L29.488 14.25Z" fill=${
    iconColor ? iconColor : 'white'
  }/>
</svg>
`;
  return <SvgXml xml={xml} />;
};
