import React from 'react';
import { SvgXml } from 'react-native-svg';

export const TwitterIcona = () => {
    const xml = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_5162_6158)">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3307 2.00001C14.6923 2.45032 13.9855 2.79475 13.2374 3.02001C12.415 2.07436 11.0896 1.74275 9.91878 2.18964C8.74792 2.63653 7.9806 3.76687 7.9974 5.02001V5.68667C5.61784 5.74837 3.36541 4.61465 1.9974 2.66667C1.9974 2.66667 -0.669271 8.66667 5.33073 11.3333C3.95775 12.2653 2.32217 12.7326 0.664062 12.6667C6.66406 16 13.9974 12.6667 13.9974 5.00001C13.9968 4.81431 13.9789 4.62907 13.9441 4.44667C14.6245 3.77567 15.1046 2.92848 15.3307 2.00001Z" fill="#30B4FE"/>
  </g>
  <defs>
  <clipPath id="clip0_5162_6158">
  <rect width="16" height="16" fill="white"/>
  </clipPath>
  </defs>
  </svg>
`;
    return <SvgXml xml={xml} />;
};

