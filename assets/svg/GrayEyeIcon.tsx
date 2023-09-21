import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

function GrayEyeIcon() {
  return (
    <Svg width={20} height={18} viewBox="0 0 20 18" fill="none">
      <Path
        d="M1.75 9s3-6 8.25-6 8.25 6 8.25 6-3 6-8.25 6-8.25-6-8.25-6z"
        stroke="#677778"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <Path
        d="M10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
        stroke="#677778"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default GrayEyeIcon;
