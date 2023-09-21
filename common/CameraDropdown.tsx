import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {DropDownObject} from '../typings/mintingpost';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {SelectList} from 'react-native-dropdown-select-list';
import {CrossIcon} from '../assets/svg';
import {DownArrowIcon} from '../assets/svg/DownArrowIcon';

type MintProps = {
  title: string;
  data: DropDownObject[];
  setSelected?: any;
};

const CameraDropdown: React.FC<MintProps> = ({title, data, setSelected}) => {
  return (
    <View style={styles.recentPic}>
      <Text style={styles.title}>{title}</Text>
      <SelectList
        setSelected={(val: any) => setSelected(val)}
        data={data}
        save="value"
        boxStyles={{
          borderRadius: 0,
          borderWidth: 0,
        }}
        dropdownStyles={{backgroundColor: 'black'}}
        inputStyles={{color: 'white'}}
        dropdownTextStyles={{color: 'white'}}
        dropdownItemStyles={{backgroundColor: 'transparent'}}
        closeicon={<CrossIcon />}
        arrowicon={
          <View style={styles.arrowIconss}>
            <DownArrowIcon />
          </View>
        }
        placeholder=" "
      />
    </View>
  );
};

export default CameraDropdown;
const styles = StyleSheet.create({
  title: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.md,
    paddingLeft: moderateScale(24),
    paddingRight: moderateScale(10),
  },
  recentPic: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: moderateScale(20),
  },
  arrowIconss: {
    paddingTop: 5,
  },
});
