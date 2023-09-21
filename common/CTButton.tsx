import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
type CTButtonProps = {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  disabled?: boolean;
  loader?: any;
};

const CTButton: React.FC<CTButtonProps> = ({
  title,
  containerStyle,
  textStyle,
  onPress,
  disabled,
  loader,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <Text style={[styles.textStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CTButton;
const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: themeColors.aquaColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: themeColors.black,
    fontSize: size.default,
    fontFamily: Fontfamily.Neuropolitical,
  },
  loader: {
    marginTop: 20,
  },
});
