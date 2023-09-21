import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {CrossIcon} from '../assets/svg';
import {DownArrowIcon} from '../assets/svg/DownArrowIcon';
import {memo} from 'react';
import {fontSize} from '../responsive';
import DropDownPicker from 'react-native-dropdown-picker';
import {NapaIcon} from '../assets/svg/NapaIcon';
type CurrencyDropdownProps = {
  title?: string;
  data: any;
  setSelected?: any;
  value?: any;
  containerStyle?: StyleProp<ViewStyle>;
};
const NftsAndSnftsDropDown: React.FC<CurrencyDropdownProps> = ({
  title,
  data,
  setSelected,
  value,
  containerStyle,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    if (data) {
      let arr: any = [];
      data.map((item: any, index: number) => {
        const inputText: any = item.description;
        const maxLength = 25;

        let truncatedText = inputText?.substring(0, maxLength);

        if (inputText?.length > maxLength) {
          truncatedText += '...';
        }
        arr.push({
          label: (
            <View key={item.tokenId}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {item.title || truncatedText}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <NapaIcon />
                <Text
                  style={{
                    color: 'white',
                    fontSize: size.s,
                    marginLeft: moderateScale(5),
                  }}>
                  {item.amount}
                </Text>
              </View>
            </View>
          ),
          value: item,
          icon: () => (
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 5,
              }}
              source={{uri: item.image || item.avatar}}
            />
          ),
        });
      });
      setItems(arr);
    }
  }, []);
  return (
    <>
      <Text style={styles.title}>{title}</Text>
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
        placeholder="Select"
        dropDownContainerStyle={{
          backgroundColor: themeColors.secondaryColor,
          borderColor: themeColors.garyColor,
          borderRadius: 10,
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          marginTop: moderateScale(5),
          marginRight: moderateScale(10),
          paddingVertical: 10,
        }}
        style={{
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: themeColors.garyColor,
          borderRadius: 0,
          padding: 0,
          maxHeight: 53,
          overflow: 'scroll',
          height: open ? 400 : 30,
        }}
        textStyle={{
          fontSize: 15,
          color: 'white',
        }}
        ArrowUpIconComponent={() => <CrossIcon />}
        ArrowDownIconComponent={() => <DownArrowIcon />}
      />
    </>
  );
};

export default memo(NftsAndSnftsDropDown);
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
    // marginLeft: moderateScale(14),
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

{
  /* <DropDownPicker
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
  placeholder="Select"
  dropDownContainerStyle={{
    backgroundColor: 'black',
    borderColor: themeColors.garyColor,
    borderRadius: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    marginTop: moderateScale(5),
    marginRight: moderateScale(10),
    paddingVertical: 10,
  }}
  style={{
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: themeColors.garyColor,
    borderRadius: 0,
    padding: 0,
    maxHeight: 53,
    overflow: 'scroll',
  }}
  textStyle={{
    fontSize: 15,
    color: 'white',
  }}
  ArrowUpIconComponent={() => <CrossIcon />}
  ArrowDownIconComponent={() => <DownArrowIcon />}
/>; */
}
