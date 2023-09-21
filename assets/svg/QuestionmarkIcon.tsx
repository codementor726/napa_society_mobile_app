import React from 'react';
import {Circle, Path, Svg} from 'react-native-svg';

type QuestionmarkIconProp = {
  height?: number;
  width?: number;
};

export const QuestionmarkIcon: React.FC<QuestionmarkIconProp> = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 7.69565C7 5.10231 9.23858 3 12 3C14.7614 3 17 5.10231 17 7.69565C17 9.43216 15.9963 10.9485 14.504 11.7609C13.2386 12.4498 12 13.5593 12 15V15"
        stroke="white"
        stroke-width="1.4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
      <Circle cx="12" cy="20" r="1" fill="white" />
    </Svg>
  );
};
