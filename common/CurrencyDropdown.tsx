import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {CrossIcon, EthereumIcon, TetherIcon} from '../assets/svg';
import {DownArrowIcon} from '../assets/svg/DownArrowIcon';
import {memo} from 'react';
import {fontSize} from '../responsive';
import DropDownPicker from 'react-native-dropdown-picker';
import {NapaTokenIcon} from '../assets/svg/NapaTokenIcon';
type CurrencyDropdownProps = {
  title?: string;
  data: any;
  setSelected?: any;
  value?: any;
  titleStyle?: StyleProp<TextStyle>;
  arrowStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  wallet?: any;
};
const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  title,
  data,
  setSelected,
  value,
  titleStyle,
  arrowStyle,
  containerStyle,
  wallet,
}) => {
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    {
      label: 'NAPA',
      value: 'NAPA',
      icon: () => (
        <NapaTokenIcon
          bgColor={themeColors.aquaColor}
          iconColor={themeColors.secondaryColor}
          width={25}
          height={25}
        />
      ),
    },
    {
      label: 'USDT',
      value: 'USDT',
      icon: () => (
        <TetherIcon
          bgColor="#FFD978"
          iconColor="white"
          width={25}
          height={25}
        />
      ),
    },
    {
      label: 'ETH',
      value: 'ETH',
      icon: () => (
        <EthereumIcon
          bgColor="#6481E7"
          iconColor={themeColors.primaryColor}
          width={25}
          height={25}
        />
      ),
    },
  ]);
  return (
    <View style={[styles.containeStyle, containerStyle]}>
      {!wallet && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setSelected}
        setItems={setItems}
        showArrowIcon={true}
        arrowIconStyle={{
          width: 20,
          height: 20,
        }}
        placeholder='Select'
        dropDownContainerStyle={{
          backgroundColor: 'black',
          borderColor: themeColors.garyColor,
          borderRadius: 10,
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          marginTop: moderateScale(5),
        }}
        style={{
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: themeColors.garyColor,
          borderRadius: 0,
          padding: 0,
          height: 53,
        }}
        textStyle={{
          fontSize:15,
          color: 'white',
        }}
        ArrowUpIconComponent={() => <CrossIcon />}
        ArrowDownIconComponent={() => <DownArrowIcon />}
      />
    </View>
  );
};

export default memo(CurrencyDropdown);
const styles = StyleSheet.create({
  arrowStyle: {
    marginTop: verticalScale(4),
  },
  title: {
    marginTop: moderateScale(16.5),
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '400',
    fontSize: size.default,
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
    // marginTop: moderateScale(10),
  },
});
