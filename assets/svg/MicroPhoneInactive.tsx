import React from 'react';
import {SvgXml} from 'react-native-svg';

export const MicroPhoneInactive = () => {
  const xml = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.9922 6.3V6C16.9922 3.79 15.2022 2 12.9922 2C10.7822 2 8.99219 3.79 8.99219 6V11" stroke="white" stroke-width="1.4" stroke-linecap="square" stroke-linejoin="round"/>
  <path d="M10.0312 14.19C10.7613 15 11.8213 15.5 12.9913 15.5C15.2013 15.5 16.9913 13.71 16.9913 11.5V11" stroke="white" stroke-width="1.4" stroke-linecap="square" stroke-linejoin="round"/>
  <path d="M7.77148 16.9484C9.14148 18.2184 10.9715 18.9984 12.9915 18.9984C17.2115 18.9984 20.6415 15.5684 20.6415 11.3484V9.64844" stroke="white" stroke-width="1.4" stroke-linecap="square" stroke-linejoin="round"/>
  <path d="M5.3418 9.64844V11.3484C5.3418 12.4084 5.5518 13.4084 5.9418 14.3284" stroke="white" stroke-width="1.4" stroke-linecap="square" stroke-linejoin="round"/>
  <path d="M21.0619 2.83984L4.92188 18.9898" stroke="white" stroke-width="1.4" stroke-linecap="square" stroke-linejoin="round"/>
  <path d="M12.9922 19V22" stroke="white" stroke-width="1.4" stroke-linecap="square" stroke-linejoin="round"/>
  </svg>
`;
  return <SvgXml xml={xml} />;
};
