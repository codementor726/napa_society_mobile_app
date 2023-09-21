import React from 'react';
import {SvgXml} from 'react-native-svg';

export const NapaGrayIcon = ({width = 22, height = 17}) => {
  const xml = `<svg
  width=${width}
  height=${height}
  viewBox="0 0 22 17"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_4796_6721)">
    <path
      d="M17.3305 17V7.52768C17.3305 6.81673 17.2678 6.2417 17.1425 5.80258C17.038 5.34256 16.8395 4.98709 16.547 4.73616C16.2754 4.46433 15.8889 4.27614 15.3875 4.17159C14.9069 4.06704 14.2906 4.01476 13.5385 4.01476H8.46154C7.73029 4.01476 7.11396 4.06704 6.61254 4.17159C6.132 4.27614 5.74549 4.46433 5.45299 4.73616C5.16049 4.98709 4.95157 5.34256 4.82621 5.80258C4.72175 6.2417 4.66952 6.81673 4.66952 7.52768V17H0V7.37085C0 6.01169 0.125356 4.86162 0.376068 3.92066C0.647673 2.97971 1.09687 2.22694 1.72365 1.66236C2.35043 1.07688 3.18614 0.658672 4.23077 0.407749C5.2754 0.135916 6.5812 0 8.14815 0H13.8205C15.4084 0 16.7246 0.135916 17.7692 0.407749C18.8139 0.658672 19.6496 1.07688 20.2764 1.66236C20.9031 2.22694 21.3419 2.97971 21.5926 3.92066C21.8642 4.86162 22 6.01169 22 7.37085V17H17.3305Z"
      fill="#677778"
    />
  </g>
  <defs>
    <clipPath id="clip0_4796_6721">
      <rect width="22" height="17" fill="white" />
    </clipPath>
  </defs>
</svg>

`;
  return <SvgXml xml={xml} />;
};