import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';

type QRCodeIconProps = {
  bgColor?: string;
  iconColor?: string;
};

export const QRCodeIcon = ({bgColor, iconColor}: QRCodeIconProps) => {
  const xml = `<svg
  width=${verticalScale(21)}
  height=${verticalScale(21)}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <g>
    <path
      d="M20 18V19C20 20.1046 19.1046 21 18 21L6 21C4.89543 21 4 20.1046 4 19V18"
      stroke= ${iconColor ? iconColor : 'white'} 
      stroke-width="1.4"
    />
    <path
      d="M4 6L4 5C4 3.89543 4.89543 3 6 3L18 3C19.1046 3 20 3.89543 20 5L20 6"
      stroke=${iconColor ? iconColor : 'white'} 
      stroke-width="1.9"
    />
    <path d="M0 12L24 12" stroke=${
      iconColor ? iconColor : 'white'
    }  stroke-width="1.4" />
  </g>
</svg>
`;
  return <SvgXml xml={xml} />;
};
