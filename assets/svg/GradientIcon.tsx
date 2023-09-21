import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

function GradientIcon() {
  return (
    <Svg width={355} height={622} viewBox="0 0 355 622" fill="none">
      <Path
        d="M0 24C0 10.745 10.745 0 24 0h307c13.255 0 24 10.745 24 24v574c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V24z"
        fill="url(#paint0_linear_6243_7242)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_6243_7242"
          x1={177.5}
          y1={0}
          x2={177.5}
          y2={622}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#181B1B" />
          <Stop offset={1} stopColor="#181B1B" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default GradientIcon;
