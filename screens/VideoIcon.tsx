
import React from 'react';
import {SvgXml} from 'react-native-svg';

export const VideoIcon = () => {
  const xml = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5222 20.4181H7.20219C4.04219 20.4181 2.99219 18.3181 2.99219 16.2081V7.78813C2.99219 4.62812 4.04219 3.57812 7.20219 3.57812H13.5222C16.6822 3.57812 17.7322 4.62812 17.7322 7.78813V16.2081C17.7322 19.3681 16.6722 20.4181 13.5222 20.4181Z" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.5124 17.1001L17.7324 15.1501V8.84013L20.5124 6.89013C21.8724 5.94013 22.9924 6.52013 22.9924 8.19013V15.8101C22.9924 17.4801 21.8724 18.0601 20.5124 17.1001Z" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`;
  return <SvgXml xml={xml} />;
};
