import React from 'react';
import {SvgXml} from 'react-native-svg';

export const UserIcon = () => {
  const xml = `<svg
  width="20"
  height="20"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <circle cx="8" cy="6" r="3.3" stroke="white" stroke-width="1.4" />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M13.2668 14.6667H14.6668C14.6668 11.3529 11.6821 8.66666 8.00016 8.66666C4.31826 8.66666 1.3335 11.3529 1.3335 14.6667H2.7335C2.7335 12.2612 4.94907 10.0667 8.00016 10.0667C11.0513 10.0667 13.2668 12.2612 13.2668 14.6667Z"
    fill="white"
  />
</svg>
`;
  return <SvgXml xml={xml} />;
};
