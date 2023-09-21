import React from 'react';
import {SvgXml} from 'react-native-svg';

export const QrCodeInnerIcon = () => {
  const xml = `<svg width="327" height="327" viewBox="0 0 327 327" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M33 326H16.3677C7.88034 326 1 319.12 1 310.632V294" stroke="white" stroke-width="2" stroke-linecap="square"/>
<path d="M33 1H16.3677C7.88034 1 1 7.88045 1 16.3679V33" stroke="white" stroke-width="2" stroke-linecap="square"/>
<path d="M294 1H310.632C319.12 1 326 7.88045 326 16.3679V33" stroke="white" stroke-width="2" stroke-linecap="square"/>
<path d="M294 326H310.632C319.12 326 326 319.12 326 310.632V294" stroke="white" stroke-width="2" stroke-linecap="square"/>
</svg>
`;
  return <SvgXml xml={xml} />;
};
