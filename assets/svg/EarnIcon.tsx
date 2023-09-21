import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {Path, Svg, G, Circle, SvgXml} from 'react-native-svg';

type EarnIconProps = {
  color: string;
  opacity: number;
};

export const EarnIcon: React.FC<EarnIconProps> = ({color, opacity}) => {
  const xml = `<svg width=${verticalScale(20)} height=${verticalScale(
    20,
  )} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g opacity=${opacity}>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM11.75 7.5C11.75 7.91421 12.0858 8.25 12.5 8.25H12.6893L10.4166 10.5228L9.32404 8.88398C9.1994 8.69702 8.9975 8.57579 8.7739 8.55365C8.5503 8.53151 8.32855 8.61079 8.16967 8.76967L4.96967 11.9697C4.67678 12.2626 4.67678 12.7374 4.96967 13.0303C5.26256 13.3232 5.73744 13.3232 6.03033 13.0303L8.58343 10.4772L9.67596 12.116C9.8006 12.303 10.0025 12.4242 10.2261 12.4464C10.4497 12.4685 10.6714 12.3892 10.8303 12.2303L13.75 9.31066V9.5C13.75 9.91421 14.0858 10.25 14.5 10.25C14.9142 10.25 15.25 9.91421 15.25 9.5V7.5C15.25 7.08579 14.9142 6.75 14.5 6.75H12.5C12.0858 6.75 11.75 7.08579 11.75 7.5Z" fill=${color}/>
  </g>
</svg>

`;
  return <SvgXml xml={xml} />;
};
