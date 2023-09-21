import {StyleSheet, View, TouchableOpacity, FlatList, Text} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {BackIcon, Search} from '../assets/svg';
import RadioButtonComponent from '../common/RadioButtonComponent';
import HandleCurrencyIcon from '../common/HandleCurrencyIcon';
import {themeColors} from '../theme/colors';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectSelectedTokenList,
  selectTokenList,
} from '../store/selectors/TokenList';
import {setSelectedTokenList} from '../store/slices/TokenList';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';

const WalletCurrencyScreen = () => {
  const {goBack} = useNavigation();
  const tokenList = useSelector(selectTokenList);
  const selectedtokenList = useSelector(selectSelectedTokenList);
  const [value, setValue] = useState<any>();
  const dispatch = useDispatch();
  const onCurrecyPress = (item: any) => {
    console.log(item, 'item');
    setValue(item);
    dispatch(setSelectedTokenList(item));
    goBack();
  };
  return (
    <Layout>
      <Header
        leftChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={goBack}>
              <BackIcon color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
        childStyle={styles.childStyle}
        centerStyle={styles.centerStyle}
        rightStyle={styles.childStyle}
        children={<Text style={styles.accountName}>Select Currency</Text>}
        title={false}
        rightChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Search color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
      />
      <View style={{height: moderateScale(20)}}>{}</View>
      <FlatList
        data={tokenList}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({item}) => (
          <RadioButtonComponent
            item={item}
            onPress={onCurrecyPress}
            title={item?.name || 'Ethereum'}
            subTitle={item?.symbol}
            isSelected={
              selectedtokenList?.tokenAddresses == item?.tokenAddresses
                ? true
                : false
            }
            iconChildren={
              <HandleCurrencyIcon
                currencyName={item?.symbol}
                bgColor={
                  selectedtokenList?.tokenAddresses == item?.tokenAddresses
                    ? themeColors.aquaColor
                    : ''
                }
                iconColor={
                  selectedtokenList?.tokenAddresses == item?.tokenAddresses
                    ? themeColors.darkColor
                    : ''
                }
              />
            }
          />
        )}
      />
    </Layout>
  );
};

export default WalletCurrencyScreen;
const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },
  accountName: {
    color: themeColors.primaryColor,
    fontSize: size.md,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
    width: '100%',
  },
});
