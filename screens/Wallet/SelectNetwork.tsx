import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Layout from '../../common/Layout';
import Header from '../../common/Header';
import {CrossIcon, EthereumIcon, ForwardIcon, Search} from '../../assets/svg';
import CTTokenButton from '../../common/CTTokenButton';
import {themeColors} from '../../theme/colors';
import {size} from '../../theme/fontstyle';
import {Fontfamily} from '../../theme/fontFamily';
import {moderateScale} from 'react-native-size-matters';
import {RightIcon} from '../../assets/svg/RightIcon';
import HandleCurrencyIcon from '../../common/HandleCurrencyIcon';
import {CURRENCIES} from '../../typings/currenices';
import {NETWORK} from '../../const/network';
import RadioButtonComponent from '../../common/RadioButtonComponent';
import {useDispatch, useSelector} from 'react-redux';
import {setNetworkType} from '../../store/slices/NapaAccount';
import {selectNetworkType} from '../../store/selectors/NapaAccount';

interface ListData {
  id: number;
  title: string;
  currencyName: string;
  value: string;
}

const SelectNetworkScreen = () => {
  const {goBack} = useNavigation();
  const dispatch = useDispatch();
  const [value, setValue] = useState<ListData>();
  const networktype = useSelector(selectNetworkType).value;
  const onNetworkPress = (item: ListData) => {
    setValue(item);
    dispatch(setNetworkType(item));
  };

  return (
    <Layout>
      {/* <Header
        leftChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={goBack}>
              <CrossIcon color="grey" />
            </TouchableOpacity>
          </View>
        }
        title={false}
        centerTitle="Select Network"
      /> */}

      <Header
        leftChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={goBack}>
              <CrossIcon color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
        childStyle={styles.childStyle}
        centerStyle={styles.centerStyle}
        rightStyle={styles.childStyle}
        title={false}
        centerTitle="Select Network"
        rightChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Search color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
      />

      <View style={{height: moderateScale(20)}}></View>
      <ScrollView>
        {NETWORK?.map((item: ListData, index: number) => (
          <RadioButtonComponent
            key={index}
            item={item}
            title={item.title}
            subTitle={item.currencyName}
            onPress={onNetworkPress}
            isSelected={networktype == item.value ? true : false}
            iconChildren={
              <HandleCurrencyIcon
                currencyName={item.currencyName}
                bgColor={networktype == item.value ? themeColors.aquaColor : ''}
                iconColor={
                  networktype == item.value ? themeColors.darkColor : ''
                }
              />
            }
          />
        ))}
      </ScrollView>
    </Layout>
  );
};

export default SelectNetworkScreen;
const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },
  mainContainer: {},

  firstCointanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(22),
  },
  firstCointanierItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    borderColor: themeColors.garyColor,
    borderRadius: 50,
  },
  tokenNameContainer: {
    paddingLeft: moderateScale(10),
  },
  tokenName: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    color: themeColors.primaryColor,
  },

  token: {
    color: themeColors.garyColor,
    fontSize: size.s,
    fontFamily: Fontfamily.Avenier,
  },
  button: {
    backgroundColor: themeColors.aquaColor,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  buttonTitle: {
    color: themeColors.secondaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.default,
    fontWeight: '400',
    textAlign: 'center',
  },
});
