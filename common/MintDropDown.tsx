/* eslint-disable react-native/no-inline-styles */
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {DropDownObject} from '../typings/mintingpost';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {SelectList} from 'react-native-dropdown-select-list';
import {CrossIcon} from '../assets/svg';
import {DownArrowIcon} from '../assets/svg/DownArrowIcon';
import {memo} from 'react';
import {fontSize} from '../responsive';
type MintProps = {
  title?: string;
  data: DropDownObject[];
  setSelected?: any;
  value?: any;
  titleStyle?: StyleProp<TextStyle>;
  arrowStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  wallet?: any;
};
const MintDropDown: React.FC<MintProps> = ({
  title,
  data,
  setSelected,
  value,
  titleStyle,
  arrowStyle,
  containerStyle,
  wallet,
}) => {
  return (
    <View style={[styles.containeStyle, containerStyle]}>
      {!wallet && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <SelectList
        setSelected={(val: any) => setSelected(val)}
        data={data}
        save="value"
        boxStyles={{
          borderBottomWidth: 1,
          borderRadius: 0,
          borderWidth: 0,
          height: fontSize(45),
          alignItems: 'center',
          paddingHorizontal: moderateScale(15),
          paddingVertical: moderateScale(0),
        }}
        maxHeight={200}
        dropdownStyles={{backgroundColor: 'black', padding: 0}}
        inputStyles={styles.textStyle}
        dropdownTextStyles={styles.textStyle}
        dropdownItemStyles={{backgroundColor: 'transparent'}}
        arrowicon={
          arrowStyle ? (
            <View style={[styles.arrowStyle, arrowStyle]}>
              <DownArrowIcon />
            </View>
          ) : (
            <DownArrowIcon />
          )
        }
        closeicon={<CrossIcon />}
        defaultOption={{key: value, value: value}}
      />
    </View>
  );
};

export default memo(MintDropDown);
const styles = StyleSheet.create({
  arrowStyle: {
    marginTop: verticalScale(6),
  },
  title: {
    marginTop: moderateScale(20),
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.s,
    marginLeft: moderateScale(14),
  },
  textStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    color: themeColors.primaryColor,
    lineHeight: fontSize(19),
    padding: 0,
    marginRight: 10,
  },
  containeStyle: {
    marginTop: moderateScale(10),
  },
});
