import React, {memo} from 'react';
import {TextInput, View, Text, StyleSheet, Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';

type InputProps = {
  title?: string;
  placholder: string;
  value?: string;
  onChange: any;
  disabled?: boolean;
};

const InputFields: React.FC<InputProps> = ({
  title,
  placholder,
  onChange,
  value,
}) => {
  return (
    <View style={styles.input}>
      <Text style={styles.inputText}>{title}</Text>
      <TextInput
        placeholder={placholder}
        placeholderTextColor={themeColors.garyColor}
        style={styles.inputField}
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
};

export default memo(InputFields);
const styles = StyleSheet.create({
  input: {
    marginTop: moderateScale(20),
  },
  inputText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.s,
    marginBottom: Platform.OS == 'ios' ? moderateScale(10) : moderateScale(0),
  },
  inputField: {
    borderBottomWidth: 1,
    borderColor: themeColors.garyColor,
    paddingBottom: moderateScale(5),
    color: themeColors.primaryColor,
  },
});
