import {StyleSheet, Text, View, TextInput} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import React from 'react';

type CTTextinputProps = {
  value: string;
  title?: string;
  focus?: boolean;
  inputRef?: any;
  onSubmitText?: any;
  type?: any;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  icon?: React.ReactNode;
  editable?: boolean;
};
const CTTextinput: React.FC<CTTextinputProps> = ({
  title,
  value,
  focus,
  inputRef,
  onSubmitText,
  onChangeText,
  secureTextEntry,
  type,
  icon,
  editable,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.textStyle}>{title}</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.inputMainContainer}
          value={value}
          onChangeText={onChangeText}
          focusable={focus ? focus : false}
          ref={inputRef}
          onSubmitEditing={onSubmitText}
          keyboardType={type ? type : 'default'}
          secureTextEntry={secureTextEntry ? secureTextEntry : false}
          editable={editable ? editable : true}
        />
        {icon && <View style={styles.eyeContainer}>{icon}</View>}
      </View>
    </View>
  );
};

export default CTTextinput;
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: moderateScale(22),
  },
  textStyle: {
    marginHorizontal: moderateScale(15),
    fontSize: size.s,
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderColor: themeColors.garyColor,
  },
  inputMainContainer: {
    flex: 1,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    paddingBottom: moderateScale(8),
    paddingTop: moderateScale(3),
    paddingHorizontal: moderateScale(15),
    color: themeColors.primaryColor,
  },
  eyeContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
