import React, { memo } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';

type ButtonProps = {
  title: string;
  color?: string;
  backgroundColor?: string;
  textColor?: string;
  onPress?: any;
};

const Button: React.FC<ButtonProps> = ({
  title,
  color,
  onPress,
  backgroundColor,
  textColor,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {
            borderColor: color,
            borderWidth: 1,
            backgroundColor: backgroundColor,
          },
        ]}>
        <Text
          style={[
            styles.text,
            {color: textColor ? textColor : themeColors.primaryColor},
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(15),
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(18),
    borderRadius: 30,
  },
  text: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.default,
    fontWeight: '500',
  },
});
