import React, {useCallback, useState} from 'react';
import RangeSliderRN from 'rn-range-slider';
import {View, Text} from 'react-native';

import Label from './Label';
import Notch from './Notch';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';
import {themeColors} from '../../theme/colors';

const RangeSlider = ({
  from,
  to,
  setCreaterFeeValue,
  value,
  color,
  icon = false,
}: any) => {
  const [low, setLow] = useState(from);
  const [high, setHigh] = useState(to);

  const renderThumb = useCallback(() => <Thumb color={color} />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value: any) => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChange = useCallback(
    (newLow: any, newHigh: any) => {
      setLow(newLow);
      setHigh(newHigh);
      setCreaterFeeValue(newLow, newHigh);
    },
    [setLow, setHigh],
  );

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // marginVertical: 10
        }}>
        <View>
          <Text
            style={[
              {fontStyle: 'italic'},
              {textAlign: 'right', fontSize: 14, color: '#D2D2D2'},
            ]}></Text>
          <Text
            style={[
              {fontWeight: 'bold'},
              {fontSize: 18, color: themeColors.garyColor},
            ]}>
            {/* {low}% */}
          </Text>
        </View>
      </View>
      <RangeSliderRN
        // style={styles.slider}
        min={value || 0}
        max={to}
        step={1}
        floatingLabel
        disableRange
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        // renderLabel={renderLabel}
        // renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
    </>
  );
};

export default RangeSlider;
