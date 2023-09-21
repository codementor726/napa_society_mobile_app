import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';

type ContinueButton = {
  title: string;
  isDisabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};
const ContinueButton: React.FC<ContinueButton> = ({
  title,
  onPress,
  isDisabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={styles.button}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ContinueButton;
const styles = StyleSheet.create({
  button: {
    backgroundColor: themeColors.aquaColor,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  buttonTitle: {
    color: themeColors.secondaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.default,
    fontWeight: '400',
    textAlign: 'center',
  },
});
