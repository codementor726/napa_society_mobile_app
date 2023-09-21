import React from 'react';
import {SvgXml} from 'react-native-svg';

export const PostNFTIcon = () => {
  const xml = `
  <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M97.2615 164.744C94.9563 171.752 85.0437 171.752 82.7385 164.744L67.2437 117.63C66.4849 115.324 64.6763 113.515 62.3705 112.756L15.256 97.2615C8.248 94.9563 8.248 85.0437 15.256 82.7385L62.3705 67.2437C64.6763 66.4849 66.4849 64.6763 67.2437 62.3705L82.7385 15.2558C85.0437 8.24806 94.9563 8.24806 97.2615 15.2558L112.756 62.3705C113.515 64.6763 115.324 66.4849 117.63 67.2437L164.744 82.7385C171.752 85.0437 171.752 94.9563 164.744 97.2615L117.63 112.756C115.324 113.515 113.515 115.324 112.756 117.63L97.2615 164.744Z" fill="url(#paint0_linear_10198_6154)"/>
<g filter="url(#filter0_d_10198_6154)">
<path d="M92.1785 112.423C91.4869 114.526 88.5131 114.526 87.8215 112.423L83.1731 98.2889C82.9455 97.5971 82.4029 97.0545 81.7111 96.8269L67.5768 92.1785C65.4744 91.4869 65.4744 88.5131 67.5768 87.8215L81.7111 83.1731C82.4029 82.9455 82.9455 82.4029 83.1731 81.7111L87.8215 67.5767C88.5131 65.4744 91.4869 65.4744 92.1785 67.5767L96.8269 81.7111C97.0545 82.4029 97.5971 82.9455 98.2889 83.1731L112.423 87.8215C114.526 88.5131 114.526 91.4869 112.423 92.1785L98.2889 96.8269C97.5971 97.0545 97.0545 97.5971 96.8269 98.2889L92.1785 112.423Z" fill="url(#paint1_linear_10198_6154)"/>
</g>
<defs>
<filter id="filter0_d_10198_6154" x="63.5581" y="63.5581" width="57.7675" height="57.7675" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2.44187" dy="2.44187"/>
<feGaussianBlur stdDeviation="2.44187"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.686275 0 0 0 0 0.717647 0 0 0 0.5 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10198_6154"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10198_6154" result="shape"/>
</filter>
<linearGradient id="paint0_linear_10198_6154" x1="10" y1="170" x2="173.409" y2="13.5612" gradientUnits="userSpaceOnUse">
<stop stop-color="#00969C"/>
<stop offset="1" stop-color="#16E6EF"/>
</linearGradient>
<linearGradient id="paint1_linear_10198_6154" x1="90.4042" y1="124.226" x2="156.652" y2="59.287" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0.2"/>
</linearGradient>
</defs>
</svg>

  `;
  return <SvgXml xml={xml} />;
};
