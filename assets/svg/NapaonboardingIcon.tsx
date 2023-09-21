import React from 'react';
import {SvgXml} from 'react-native-svg';

export const NapaonboardingIcon = () => {
  const xml = `
  <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="90" cy="90" r="82.5" fill="#16E6EF"/>
<circle cx="90" cy="90" r="82.5" fill="url(#paint0_linear_9695_16591)"/>
<g filter="url(#filter0_d_9695_16591)">
<path d="M117.192 126V85.8819C117.192 82.8708 116.923 80.4354 116.385 78.5756C115.936 76.6273 115.083 75.1218 113.827 74.059C112.66 72.9078 111 72.1107 108.846 71.6679C106.782 71.2251 104.135 71.0037 100.904 71.0037H79.0962C75.9551 71.0037 73.3077 71.2251 71.1539 71.6679C69.0897 72.1107 67.4295 72.9078 66.1731 74.059C64.9167 75.1218 64.0192 76.6273 63.4808 78.5756C63.0321 80.4354 62.8077 82.8708 62.8077 85.8819V126H42.75V85.2177C42.75 79.4613 43.2885 74.5904 44.3654 70.6052C45.5321 66.6199 47.4615 63.4317 50.1538 61.0406C52.8462 58.5609 56.4359 56.7897 60.9231 55.7269C65.4103 54.5756 71.0192 54 77.75 54H102.115C108.936 54 114.59 54.5756 119.077 55.7269C123.564 56.7897 127.154 58.5609 129.846 61.0406C132.538 63.4317 134.423 66.6199 135.5 70.6052C136.667 74.5904 137.25 79.4613 137.25 85.2177V126H117.192Z" fill="url(#paint1_linear_9695_16591)"/>
</g>
<defs>
<filter id="filter0_d_9695_16591" x="40.3081" y="51.5581" width="104.267" height="81.7675" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2.44187" dy="2.44187"/>
<feGaussianBlur stdDeviation="2.44187"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.686275 0 0 0 0 0.717647 0 0 0 0.5 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9695_16591"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9695_16591" result="shape"/>
</filter>
<linearGradient id="paint0_linear_9695_16591" x1="7.5" y1="172.5" x2="176.016" y2="11.1725" gradientUnits="userSpaceOnUse">
<stop stop-color="#00969C"/>
<stop offset="1" stop-color="#16E6EF"/>
</linearGradient>
<linearGradient id="paint1_linear_9695_16591" x1="90.7958" y1="141.339" x2="187.113" y2="17.4199" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0.2"/>
</linearGradient>
</defs>
</svg>
  `;
  return <SvgXml xml={xml} />;
};
