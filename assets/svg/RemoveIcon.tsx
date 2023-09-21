import {SvgXml} from 'react-native-svg';
export const RemoveIcon = () => {
  const xml = `<svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_b_8638_14851)">
  <path d="M28 0H9L0 10L9 20H28V0Z" fill="white" fill-opacity="0.1"/>
  </g>
  <path d="M14 7L17 10M20 13L17 10M17 10L20 7L14 13" stroke="white" stroke-width="2"/>
  <defs>
  <filter id="filter0_b_8638_14851" x="-20" y="-20" width="68" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feGaussianBlur in="BackgroundImageFix" stdDeviation="10"/>
  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_8638_14851"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_8638_14851" result="shape"/>
  </filter>
  </defs>
  </svg>
    
`;
  return <SvgXml xml={xml} />;
};