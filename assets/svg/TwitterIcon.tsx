import React from 'react';
import {SvgXml} from 'react-native-svg';

export const TwitterIcon = () => {
  const xml = `<svg
  width="16"
  height="18"
  viewBox="0 0 16 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_5162_6157)">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.3307 3.00001C14.6923 3.45032 13.9855 3.79475 13.2374 4.02001C12.415 3.07436 11.0896 2.74275 9.91878 3.18964C8.74792 3.63653 7.9806 4.76687 7.9974 6.02001V6.68667C5.61784 6.74837 3.36541 5.61465 1.9974 3.66667C1.9974 3.66667 -0.669271 9.66667 5.33073 12.3333C3.95775 13.2653 2.32217 13.7326 0.664062 13.6667C6.66406 17 13.9974 13.6667 13.9974 6.00001C13.9968 5.81431 13.9789 5.62907 13.9441 5.44667C14.6245 4.77567 15.1046 3.92848 15.3307 3.00001Z"
      fill="#30B4FE"
    />
  </g>
  <defs>
    <clipPath id="clip0_5162_6157">
      <rect width="16" height="16" fill="white" transform="translate(0 1)" />
    </clipPath>
  </defs>
</svg>
`;
  return <SvgXml xml={xml} />;
};
