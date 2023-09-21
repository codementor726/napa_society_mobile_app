import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RightIcon} from '../assets/svg/RightIcon';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {moderateScale} from 'react-native-size-matters';

type CheckboxProps = {
  title?: string;
  isChecked?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({title, isChecked}) => {
  return (
    <View style={styles.container}>
      <View style={!isChecked ? styles.Checkbox : styles.checked}>
        {isChecked && (
          <RightIcon color="black" width={10} height={10} strokeWidth={3} />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    // width: 150,
    // marginTop: 10,
    marginHorizontal: 3,
  },
  Checkbox: {
    textAlign: 'center',
    borderWidth: 2,
    borderColor: themeColors.garyColor,
    width: 19,
    height: 19,
    borderRadius: 4,
    alignItems: 'center',
  },
  checked: {
    paddingTop: 2,
    backgroundColor: themeColors.aquaColor,
    borderWidth: 2,
    borderColor: themeColors.aquaColor,
    width: 19,
    height: 19,
    borderRadius: 4,
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontFamily: Fontfamily.Avenier,
    color: themeColors.primaryColor,
    fontSize: size.md,
    fontWeight: '500',
    marginLeft: moderateScale(10),
  },
});
