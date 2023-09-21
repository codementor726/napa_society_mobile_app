import React from 'react';
import Svg, {Circle, G, Path, Defs, ClipPath} from 'react-native-svg';

type EthereumIconProps = {
  bgColor?: string;
  iconColor?: string;
};
export const BnbIcon = ({bgColor, iconColor}: EthereumIconProps) => {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Circle cx={24} cy={24} r={24} fill={bgColor ? bgColor : '#192020'} />
      <G clipPath="url(#clip0_6243_7896)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 17.835l-4.37 4.37-2.542-2.543L24 12.75l6.914 6.914-2.542 2.543L24 17.835zm-8.707 3.622L12.75 24l2.542 2.542L17.835 24l-2.542-2.542zM24 30.165l-4.37-4.37-2.546 2.54.004.003L24 35.25l6.914-6.914.002-.001-2.544-2.541L24 30.165zm8.708-8.706L30.165 24l2.543 2.543L35.25 24l-2.542-2.543zm-6.129 2.539l.002.001-.001.002L24 26.58l-2.578-2.578-.004-.004.004-.004.452-.451.219-.22L24 21.418l2.58 2.58z"
          fill={iconColor ? iconColor : 'white'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_6243_7896">
          <Path
            fill={iconColor ? iconColor : 'white'}
            transform="translate(12 12)"
            d="M0 0H24V24H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
