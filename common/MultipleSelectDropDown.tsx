import React from 'react';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {DropDownObject} from '../typings/mintingpost';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {CrossIcon} from '../assets/svg';
import {DownArrowIcon} from '../assets/svg/DownArrowIcon';
import {memo} from 'react';
import {fontSize} from '../responsive';
import {MultipleSelectList} from 'react-native-dropdown-select-list';

type MintProps = {
  title?: string;
  data: DropDownObject[];
  setSelected?: any;
  value?: any;
};
const MultipleSelectDropDown: React.FC<MintProps> = ({
  title,
  data,
  setSelected,
  value,
}) => {
  return (
    <>
      <MultipleSelectList
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
        dropdownStyles={{backgroundColor: 'black', padding: 0}}
        inputStyles={styles.textStyle}
        dropdownTextStyles={styles.textStyle}
        dropdownItemStyles={{backgroundColor: 'transparent'}}
        arrowicon={<DownArrowIcon />}
        closeicon={<CrossIcon />}
        label="hello"
        search={false}
        defaultOption={{key: value, value: value}}
      />
    </>
  );
};

export default memo(MultipleSelectDropDown);
const styles = StyleSheet.create({
  title: {
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(15),
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.s,
  },
  textStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    color: themeColors.primaryColor,
    lineHeight: fontSize(19),
    padding: 0,
    marginRight: 10,
  },
});
