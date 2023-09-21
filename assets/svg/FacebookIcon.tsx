import React from 'react';
import {SvgXml} from 'react-native-svg';

export const FacebookIcon = () => {
  const xml = `<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M10.5395 2.65667H12V0.112667C11.748 0.078 10.8814 0 9.87218 0C7.76635 0 6.32381 1.32467 6.32381 3.75933V6H4V8.844H6.32381V16H9.1729V8.84467H11.4027L11.7567 6.00067H9.17224V4.04133C9.1729 3.21933 9.39422 2.65667 10.5395 2.65667Z"
    fill="#1877F2"
  />
</svg>
`;
  return <SvgXml xml={xml} />;
};
