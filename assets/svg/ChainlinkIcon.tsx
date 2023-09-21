import React from 'react';
import {SvgXml} from 'react-native-svg';

type ChainlinkIconProps = {
  bgColor?: string;
  iconColor?: string;
};

export const ChainlinkIcon = ({bgColor, iconColor}: ChainlinkIconProps) => {
  const xml = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="24" cy="24" r="24" fill=${bgColor ? bgColor : '#192020'}/>
<path d="M24.0034 12.75L21.9392 13.9369L16.3142 17.1881L14.25 18.375V29.625L16.3142 30.8119L21.9908 34.0631L24.055 35.25L26.1193 34.0631L31.6927 30.8119L33.7569 29.625V18.375L31.6927 17.1881L26.0677 13.9369L24.0034 12.75ZM18.3784 27.2511V20.7489L24.0034 17.4977L29.6284 20.7489V27.2511L24.0034 30.5023L18.3784 27.2511Z" fill=${
    iconColor ? iconColor : 'white'
  }/>
</svg>
`;
  return <SvgXml xml={xml} />;
};
