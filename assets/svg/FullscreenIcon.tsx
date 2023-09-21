import React from 'react';
import {G, Path, Svg} from 'react-native-svg';

const FullscreenIcon = () => {
  return (
    <Svg 
    width="20" height="20" viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet">
   
   <G transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
   fill="#FFFFFF" stroke="none">
   <Path d="M0 4205 l0 -915 365 0 365 0 0 550 0 550 550 0 550 0 0 365 0 365
   -915 0 -915 0 0 -915z"/>
   <Path d="M3290 4755 l0 -365 550 0 550 0 0 -550 0 -550 365 0 365 0 0 915 0
   915 -915 0 -915 0 0 -365z"/>
   <Path d="M0 915 l0 -915 915 0 915 0 0 365 0 365 -550 0 -550 0 0 550 0 550
   -365 0 -365 0 0 -915z"/>
   <Path d="M4390 1280 l0 -550 -550 0 -550 0 0 -365 0 -365 915 0 915 0 0 915 0
   915 -365 0 -365 0 0 -550z"/>
   </G>
   </Svg>
  );
};
export default FullscreenIcon;

