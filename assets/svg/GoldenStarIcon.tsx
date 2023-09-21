import React from 'react';
import {SvgXml} from 'react-native-svg';

export const GoldenStarIcon = ({width = 26, height = 25}: any) => {
  const xml = `<svg
  width=${width}
  height=${height}
  viewBox="0 0 26 25"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d_10111_2567)">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.5477 8.38118C12.7277 7.9978 13.273 7.9978 13.4529 8.38118L14.3033 10.1927C14.3741 10.3435 14.5153 10.4492 14.68 10.4745L16.6225 10.773C17.0246 10.8348 17.1885 11.3254 16.9043 11.6165L15.4684 13.0872C15.3574 13.2008 15.3071 13.3603 15.3326 13.517L15.667 15.5672C15.7342 15.9792 15.2969 16.2873 14.9316 16.0853L13.2423 15.1511C13.0917 15.0679 12.9089 15.0679 12.7584 15.1511L11.0691 16.0853C10.7038 16.2873 10.2664 15.9792 10.3336 15.5672L10.668 13.517C10.6936 13.3603 10.6432 13.2008 10.5323 13.0872L9.09634 11.6165C8.81211 11.3254 8.97601 10.8348 9.37814 10.773L11.3207 10.4745C11.4853 10.4492 11.6265 10.3435 11.6973 10.1927L12.5477 8.38118Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.5477 8.38118C12.7277 7.9978 13.273 7.9978 13.4529 8.38118L14.3033 10.1927C14.3741 10.3435 14.5153 10.4492 14.68 10.4745L16.6225 10.773C17.0246 10.8348 17.1885 11.3254 16.9043 11.6165L15.4684 13.0872C15.3574 13.2008 15.3071 13.3603 15.3326 13.517L15.667 15.5672C15.7342 15.9792 15.2969 16.2873 14.9316 16.0853L13.2423 15.1511C13.0917 15.0679 12.9089 15.0679 12.7584 15.1511L11.0691 16.0853C10.7038 16.2873 10.2664 15.9792 10.3336 15.5672L10.668 13.517C10.6936 13.3603 10.6432 13.2008 10.5323 13.0872L9.09634 11.6165C8.81211 11.3254 8.97601 10.8348 9.37814 10.773L11.3207 10.4745C11.4853 10.4492 11.6265 10.3435 11.6973 10.1927L12.5477 8.38118Z"
      stroke="white"
    />
  </g>
  <defs>
    <filter
      id="filter0_d_10111_2567"
      x="0.953125"
      y="0.09375"
      width="24.0938"
      height="24.0547"
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
      <feGaussianBlur stdDeviation="4" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
      />
      <feBlend
        mode="normal"
        in2="BackgroundImageFix"
        result="effect1_dropShadow_10111_2567"
      />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="effect1_dropShadow_10111_2567"
        result="shape"
      />
    </filter>
  </defs>
</svg>
`;
  return <SvgXml xml={xml} />;
};
