import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {Path, Svg, G, SvgXml} from 'react-native-svg';

type MarketPlaceIconProps = {
  opacity: number;
  color: string;
};

export const MarketPlaceIcon: React.FC<MarketPlaceIconProps> = ({
  opacity,
  color,
}) => {
  const xml = `<svg width=${verticalScale(25)} height=${verticalScale(
    25,
  )} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <g opacity=${opacity}>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5504 2.42L19.4348 5.85C20.3957 6.42 20.9901 7.45 21 8.58V15.42C21 16.55 20.4056 17.59 19.4447 18.15L13.5603 21.58C12.5894 22.14 11.4007 22.14 10.4397 21.58L4.55531 18.15C3.59439 17.58 3 16.54 3 15.42V8.58C3 7.45 3.59439 6.41 4.55531 5.85L10.4298 2.42C11.4007 1.86 12.5894 1.86 13.5504 2.42ZM9.49886 11C8.12021 11 7 9.87827 7 8.5C7 7.12173 8.12021 6 9.49886 6C10.8765 6 11.9977 7.12173 11.9977 8.5C11.9977 9.87827 10.8765 11 9.49886 11ZM5.55648 16.413L5.5834 16.3776C6.48038 15.1916 7.08473 14.8478 7.75645 15.1497C8.02896 15.2743 8.30248 15.4612 8.58404 15.6589C9.3342 16.1896 10.377 16.919 11.7506 16.1273C12.6906 15.5792 13.2358 14.6391 13.7106 13.8205L13.7185 13.8068C13.7522 13.7494 13.7855 13.692 13.8188 13.6347C13.9783 13.3599 14.1357 13.0887 14.3138 12.8389C14.5371 12.5263 15.3646 11.5487 16.4366 12.2448C17.1194 12.6831 17.6936 13.2761 18.308 13.911C18.5423 14.1538 18.7092 14.4299 18.8208 14.7264C18.8991 14.9355 18.9496 15.1544 18.9764 15.3785C18.8896 15.927 18.5687 16.4027 18.1093 16.6738L18.1092 16.6738L12.8826 19.7585L12.8808 19.7595C12.3282 20.0814 11.6598 20.0785 11.1214 19.7608L11.1213 19.7608L5.89737 16.6777L5.89448 16.676C5.77099 16.6015 5.65778 16.513 5.55648 16.413Z" fill=${color}/>
</g>
</svg>

`;
  return <SvgXml xml={xml} />;
};