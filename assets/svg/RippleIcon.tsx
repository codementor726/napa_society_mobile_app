import React from 'react';
import {SvgXml} from 'react-native-svg';

type RippleIconProps = {
  bgColor?: string;
  iconColor?: string;
};

export const RippleIcon = ({bgColor, iconColor}: RippleIconProps) => {
  const xml = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill=${bgColor ? bgColor : '#192020'}/>
        <path d="M17.5 14H16.1C15.1 14 14.6 15.1 15.3 15.8L21 21.5C22.6 23.1 25.3 23.1 26.9 21.5L32.6 15.8C33.4 15.1 32.9 14 31.9 14H30.5C29.7 14 28.9 14.3 28.3 14.9L24.7 18.5C24.3 18.9 23.6 18.9 23.2 18.5L19.7 14.9C19.1 14.3 18.3 14 17.5 14Z" fill=${
          iconColor ? iconColor : 'white'
        } stroke=${
    iconColor ? iconColor : 'white'
  } stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round"/>
        <path d="M17.5 34H16.1C15.2 34 14.7 32.9 15.4 32.2L21 26.5C22.6 24.9 25.3 24.9 26.9 26.5L32.6 32.2C33.3 32.9 32.8 34 31.9 34H30.5C29.7 34 28.9 33.7 28.3 33.1L24.7 29.5C24.3 29.1 23.6 29.1 23.2 29.5L19.6 33.1C19.1 33.6 18.3 34 17.5 34Z" fill=${
          iconColor ? iconColor : 'white'
        } stroke=${
    iconColor ? iconColor : 'white'
  } stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round"/>
    </svg>
`;
  return <SvgXml xml={xml} />;
};
