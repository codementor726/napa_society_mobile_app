import React from 'react';
import {SvgXml} from 'react-native-svg';

export const ToggleIcon = () => {
  const xml = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="16" fill="#16E6EF"/>
  <ellipse cx="13.6667" cy="11.3669" rx="0.666667" ry="0.666667" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse cx="13.6667" cy="16.0339" rx="0.666667" ry="0.666667" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="13.6667" cy="20.6999" r="0.666667" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse cx="18.3341" cy="11.3669" rx="0.666667" ry="0.666667" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse cx="18.3341" cy="16.0339" rx="0.666667" ry="0.666667" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse cx="18.3341" cy="20.6999" rx="0.666667" ry="0.666667" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;
  return <SvgXml xml={xml} />;
};
