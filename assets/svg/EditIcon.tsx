import React from 'react';
import {SvgXml} from 'react-native-svg';

export const EditIcon = () => {
  const xml = `<svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M1 11.7071V14.5C1 14.7761 1.22386 15 1.5 15H4.29289C4.4255 15 4.55268 14.9473 4.64645 14.8536L15 4.5L11.5 1L1.14645 11.3536C1.05268 11.4473 1 11.5745 1 11.7071Z"
    stroke="white"
    stroke-width="1.4"
  />
</svg>
`;
  return <SvgXml xml={xml} />;
};
