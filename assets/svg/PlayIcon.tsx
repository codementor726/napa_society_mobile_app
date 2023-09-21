import React from 'react';
import {SvgXml} from 'react-native-svg';

export const PlayIcon = () => {
  const xml = `<svg
  width="82"
  height="86"
  viewBox="0 0 82 86"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d_7670_12927)">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M35.068 32.9377C33.7362 32.0966 32 33.0535 32 34.6287V51.3713C32 52.9465 33.7362 53.9034 35.068 53.0623L48.3226 44.691C49.5653 43.9061 49.5653 42.0939 48.3226 41.309L35.068 32.9377Z"
      fill="white"
    />
  </g>
  <defs>
    <filter
      id="filter0_d_7670_12927"
      x="0"
      y="0.625427"
      width="81.2549"
      height="84.7491"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset />
      <feGaussianBlur stdDeviation="16" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0.0627451 0 0 0 0 0.137255 0 0 0 0 0.141176 0 0 0 1 0"
      />
      <feBlend
        mode="normal"
        in2="BackgroundImageFix"
        result="effect1_dropShadow_7670_12927"
      />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="effect1_dropShadow_7670_12927"
        result="shape"
      />
    </filter>
  </defs>
</svg>
`;
  return <SvgXml xml={xml} />;
};
