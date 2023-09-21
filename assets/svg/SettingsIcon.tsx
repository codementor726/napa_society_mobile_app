import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

type SettingsIconProps = {
  iconColor?: string;
};

export const SettingsIcon = ({iconColor}: SettingsIconProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22.105 11.85a.3.3 0 010 .3l-4.922 8.526a.3.3 0 01-.26.15H7.077a.3.3 0 01-.26-.15L1.896 12.15a.3.3 0 010-.3l4.923-8.526a.3.3 0 01.26-.15h9.845a.3.3 0 01.26.15l4.922 8.526z"
        stroke={iconColor ? iconColor : '#677778'}
        strokeWidth={1.4}
      />
      <Circle
        cx={12}
        cy={12}
        r={3.3}
        stroke={iconColor ? iconColor : '#677778'}
        strokeWidth={1.4}
      />
    </Svg>
  );
};
