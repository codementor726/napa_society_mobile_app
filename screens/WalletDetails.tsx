import {useNavigation, useRoute} from '@react-navigation/native';
import React, {FC} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import {BackIcon, TetherIcon, TimeIcon} from '../assets/svg';
import Layout from '../common/Layout';
import {Fontfamily} from '../theme/fontFamily';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ethereum} from '../assets/svg/Ethereum';
import {CURRENCIES} from '../typings/currenices';
import GraphImg from '../assets/svg/GraphImg';
import {SCREENS} from '../typings/screens-enums';
import {numberWithCommas} from '../utils/NumberWithCommas';
import {NapaTokenIcon} from '../assets/svg/NapaTokenIcon';
import {useDispatch, useSelector} from 'react-redux';
import {selectTokenList} from '../store/selectors/TokenList';
import {setSelectedTokenList} from '../store/slices/TokenList';

const WalletDetails: FC = () => {
  const route = useRoute<any>();
  const {navigate, goBack} = useNavigation<any>();
  const navigation = useNavigation<any>();
  let assetData = route.params.assetData;
  const tokenList = useSelector(selectTokenList);
  const dispatch = useDispatch();

  const handleSendToken = () => {
    const selectedToken = tokenList.find(
      (token: any) => token.tokenAddresses == assetData.tokenAddress,
    );
    dispatch(setSelectedTokenList(selectedToken));
    navigation.navigate(SCREENS.WITHDRAWAL);
  };

  const handleCurrenyIcon = () => {
    if (assetData.currencyName.includes(CURRENCIES.BTC)) {
      return <Ethereum />;
    }
    if (assetData.currencyName.includes(CURRENCIES.XRP)) {
      return <Ethereum />;
    }
    if (assetData.currencyName.includes(CURRENCIES.ETH)) {
      return <Ethereum />;
    }
    if (assetData.currencyName.includes(CURRENCIES.BAYC)) {
      return <Ethereum />;
    }
    if (assetData.currencyName.includes(CURRENCIES.CRO)) {
      return <Ethereum />;
    }
    if (assetData.currencyName.includes(CURRENCIES.DOT)) {
      return <Ethereum />;
    }
    if (assetData.currencyName.includes(CURRENCIES.MATIC)) {
      return <Ethereum />;
    }
    if (assetData.currencyName.includes(CURRENCIES.NEAR)) {
      return <Ethereum />;
    }
    if (assetData.currencyName.includes(CURRENCIES.LINK)) {
      return <Ethereum />;
    }
    if (assetData.currencyName.includes(CURRENCIES.USDT)) {
      return <TetherIcon />;
    }
    if (assetData.currencyName.includes(CURRENCIES.AVAX)) {
      return <Ethereum />;
    }
    if (assetData.currencyName.includes(CURRENCIES.NAPA)) {
      return <NapaTokenIcon />;
    }
  };

  function renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerFirstContainer}>
          <TouchableOpacity onPress={() => goBack()}>
            <BackIcon color={themeColors.garyColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconContainer}>
            {handleCurrenyIcon()}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigate(SCREENS.TOKENTRANSACTIONHISTORY, {
                tokenAddress: assetData.tokenAddress,
              })
            }>
            <TimeIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.headerSecondContainer}>
          <Text style={styles.headerSecondTextOne}>
            {assetData.currencyName}
          </Text>
          <Text style={styles.headerSecondTextTwo}>{assetData.title}</Text>
          <Text style={styles.headerSecondTextThree}>
            {numberWithCommas(assetData.balance || '0')}
          </Text>
          <Text style={styles.headerSecondTextFourth}>+ 0.32%</Text>
        </View>
      </View>
    );
  }

  function HomeScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
      </View>
    );
  }

  function SettingsScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }

  function MyTabBar(state: any, descriptors: any, navigation: any) {
    return (
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1}}>
              <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <Layout>
      <View style={{height: '100%', width: '100%'}}>
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
          <View>{renderHeader()}</View>
          <View style={{height: moderateScale(20)}}></View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <GraphImg />
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SCREENS.DEPOSITSCREEN);
            }}
            style={[styles.btnStyle, styles.confirmStyle]}>
            <Text style={[styles.depositeStyle, {color: themeColors.black}]}>
              Receive
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              {
                handleSendToken();
              }
            }}
            style={[styles.btnStyle, styles.withdrawStyle]}>
            <Text
              style={[styles.depositeStyle, {color: themeColors.primaryColor}]}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default WalletDetails;
const styles = StyleSheet.create({
  mainContainer: {
    margin: 8,
  },
  headerContainer: {
    marginTop: 30,
    marginHorizontal: moderateScale(22),
  },
  headerFirstContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
  },
  headerSecondContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  headerIconContainer: {
    height: 88,
    width: 88,
    backgroundColor: themeColors.darkGray,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  headerTitle: {
    color: 'white',
    marginRight: 11,
    fontFamily: 'Avenir',
    fontSize: 16,
    lineHeight: 22.4,
  },
  headerIcon: {
    marginTop: 4.5,
    height: 44,
    width: 44,
  },
  headerSecondTextOne: {
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 33.6,
    color: themeColors.primaryColor,
    textTransform: 'uppercase',
  },
  headerSecondTextTwo: {
    marginTop: 3,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
    lineHeight: 19.6,
    color: themeColors.garyColor,
  },
  headerSecondTextThree: {
    marginTop: 16,
    fontFamily: Fontfamily.Grostestk,
    // fontWeight: '700',
    fontSize: size.vxlg,
    lineHeight: 52.8,
    color: themeColors.primaryColor,
    textTransform: 'capitalize',
  },
  headerSecondTextFourth: {
    marginTop: 8,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.lg,
    lineHeight: 25.2,
    color: themeColors.aquaColor,
    textTransform: 'capitalize',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: moderateScale(31),
    marginHorizontal: 17,
  },
  counterText: {
    color: themeColors.primaryColor,
    fontSize: size.xxxlg,
    fontFamily: Fontfamily.Grostestk,
    lineHeight: 52.8,
  },
  napaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  CounterNapaIcon: {
    marginBottom: 5,
    marginLeft: 9,
  },
  napaCounterTextSmall: {
    color: themeColors.garyColor,
    marginBottom: moderateScale(10),
    fontSize: size.md,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    lineHeight: 17.6,
    textTransform: 'uppercase',
  },
  transactionContainer: {
    marginVertical: moderateScale(27),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionContainerChild: {
    backgroundColor: '#192020',
    borderColor: '#192020',
    justifyContent: 'center',
    borderRadius: 24,
    width: '48%',
    height: verticalScale(97),
    padding: moderateScale(17),
  },
  transactionChildText: {
    color: themeColors.aquaColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    marginTop: moderateScale(12),
  },
  topTabContainer: {
    paddingHorizontal: 16,
  },

  amountContainer: {
    marginTop: 31,
    flexDirection: 'row',
  },
  topTabText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    marginRight: 20,
    paddingBottom: 11,
    fontWeight: '500',
    lineHeight: 19.6,
  },
  topTabActiveTab: {
    color: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
  },

  transactionChildTextWithdrawal: {
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    marginTop: moderateScale(12),
  },
  socialArtitems: {
    marginHorizontal: moderateScale(24),
    paddingBottom: moderateScale(5),
    marginTop: moderateScale(20),
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchImportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchImportText: {
    marginLeft: 12,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.default,
    lineHeight: 15.4,
    color: themeColors.aquaColor,
  },
  assetsListContainer: {
    marginTop: 21,
    paddingHorizontal: 16,
    paddingBottom: 98,
  },
  searchInput: {
    marginLeft: 16,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    lineHeight: 19.6,
    color: 'white',
  },
  footerContainer: {
    height: 80,
    position: 'relative',
    bottom: 0,
    flexDirection: 'row',
  },
  btnStyle: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmStyle: {
    backgroundColor: themeColors.aquaColor,
  },
  withdrawStyle: {
    backgroundColor: themeColors.lightAquaColor,
  },
  depositeStyle: {
    fontSize: size.default,
    fontFamily: Fontfamily.Neuropolitical,
  },
});
