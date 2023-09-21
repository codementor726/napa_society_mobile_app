import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const CrownIcon = (props: SvgProps) => (
  <Svg width={28} height={19} fill="none" {...props}>
    <Path
      fill="#FFA50A"
      fillRule="evenodd"
      stroke="#FFA50A"
      strokeLinecap="round"
      strokeWidth={1.4}
      d="m13.996 2 5.333 8 6.667-5.333L23.33 18H4.663L1.996 4.667 8.663 10l5.333-8Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CrownIcon;
