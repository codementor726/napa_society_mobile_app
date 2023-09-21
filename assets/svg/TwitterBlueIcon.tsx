import React from 'react';
import {SvgXml} from 'react-native-svg';

export const TwitterBlueIcon = () => {
  const xml = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3307 1.99903C14.6923 2.44935 13.9855 2.79377 13.2374 3.01903C12.415 2.07339 11.0896 1.74177 9.91878 2.18866C8.74792 2.63556 7.9806 3.7659 7.9974 5.01903V5.6857C5.61784 5.7474 3.36541 4.61368 1.9974 2.6657C1.9974 2.6657 -0.669271 8.6657 5.33073 11.3324C3.95775 12.2643 2.32217 12.7316 0.664062 12.6657C6.66406 15.999 13.9974 12.6657 13.9974 4.99903C13.9968 4.81333 13.9789 4.62809 13.9441 4.4457C14.6245 3.77469 15.1046 2.9275 15.3307 1.99903Z" fill="#1D9BF0"/>
  </svg>
`;
  return <SvgXml xml={xml} />;
};
