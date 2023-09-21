import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Layout from '../../common/Layout';
import Header from '../../common/Header';
import {
  BackIcon,
  DepositIcon,
  EthereumIcon,
  Search,
  TetherIcon,
  WithdarawalIcon,
} from '../../assets/svg';
import {moderateScale} from 'react-native-size-matters';
import {size} from '../../theme/fontstyle';
import {Fontfamily} from '../../theme/fontFamily';
import {themeColors} from '../../theme/colors';
import {useSelector} from 'react-redux';
import {
  selectAccountList,
  selectNapaWallet,
  selectNetworkType,
} from '../../store/selectors/NapaAccount';
import {numberWithCommas} from '../../utils/NumberWithCommas';
import {CURRENCIES} from '../../typings/currenices';
import {NapaTokenIcon} from '../../assets/svg/NapaTokenIcon';
import moment from 'moment';
import {selectProfileList} from '../../store/selectors/profileDetailSelector';
import {getTokenTransactions} from '../../services/AssetManagement';
import {useToast} from 'react-native-toast-notifications';

const TokenTransactionHistory = ({route}: any) => {
  const {goBack} = useNavigation<any>();
  const {tokenAddress} = route.params;
  const account = useSelector(selectAccountList);
  const currentActive = useSelector(selectNapaWallet);
  const networkType = useSelector(selectNetworkType);
  const [selectedOption, setSelectedOption] = useState<any>();
  const [filterTransactionHistory, setFilterTransactionHistory] =
    useState<any>();
  const profileId = useSelector(selectProfileList).profileId;
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  useEffect(() => {
    if (account) {
      const selectedAccount = account?.find(
        (val: any, index: number) =>
          val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
      );
      setSelectedOption(selectedAccount);
    }
  }, [account]);

  const getTokenTransactionHistory = async () => {
    setIsLoading(true);
    const {data, error, message}: any = await getTokenTransactions(
      profileId,
      networkType?.value,
      tokenAddress,
    );
    console.log(profileId);
    console.log(networkType?.value);
    console.log(tokenAddress);
    if (error) {
      console.log(message, 'token transaction history error');
      //   toast.show(message, {
      //     type: 'danger',
      //   });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setFilterTransactionHistory(data?.data?.OtherTokenWalletBalance?.result);
  };

  useEffect(() => {
    if (tokenAddress) {
      getTokenTransactionHistory();
    }
  }, [tokenAddress]);

  const handleCurrenyIcon = (name: string = 'ETH') => {
    if (name.includes(CURRENCIES.ETH)) {
      return <EthereumIcon width={25} height={25} />;
    }
    if (name.includes(CURRENCIES.USDT)) {
      return <TetherIcon width={25} height={25} />;
    }
    if (name.includes(CURRENCIES.NAPA)) {
      return <NapaTokenIcon width={25} height={25} />;
    }
  };

  const handlePress = (hash: string) => {
    let url = '';
    if (networkType.value == '2') {
      url = `https://sepolia.etherscan.io/tx/${hash}`;
    } else if (networkType.value == '0') {
      url = `https://etherscan.io/tx/${hash}`;
    } else if (url == '') {
      return;
    }
    Linking.openURL(url);
  };

  const renderItem = (item: any, index: number) => {
    return (
      <TouchableOpacity
        onPress={() => handlePress(item?.transaction_hash || item?.hash)}
        key={index}
        style={styles.mainContainer}>
        <View style={[styles.firstCointanier]}>
          <View style={styles.firstCointanierItem}>
            <View style={[styles.tokenIcon]}>
              {selectedOption &&
              selectedOption[`NWA_${currentActive}_AC`] ==
                +(item?.to_wallet || item?.to) ? (
                <DepositIcon height={26} width={26} />
              ) : (
                <WithdarawalIcon height={26} width={26} />
              )}
            </View>
            <View style={styles.tokenNameContainer}>
              <Text numberOfLines={1} style={styles.tokenName}>
                {selectedOption &&
                selectedOption[`NWA_${currentActive}_AC`] ==
                  +(item?.to_wallet || item?.to)
                  ? 'Receive'
                  : 'Send'}
                {/* {item.title} */}
              </Text>
              <Text style={styles.token}>
                {moment(item.blockTimestamp).format('DD MMM LT')}
              </Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Text
              style={[
                styles.depositStyle,
                {
                  color:
                    selectedOption &&
                    selectedOption[`NWA_${currentActive}_AC`] ==
                      +(item?.to_wallet || item?.to)
                      ? themeColors.aquaColor
                      : themeColors.lightred,
                },
              ]}>
              {' '}
              {selectedOption &&
              selectedOption[`NWA_${currentActive}_AC`] ==
                +(item?.to_wallet || item?.to)
                ? '+'
                : '-'}
            </Text>
            <View style={{paddingHorizontal: 6}}>
              <Text style={{color: 'white'}}>
                {!item.contractType && handleCurrenyIcon(item?.tokenSymbol)}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.depositStyle,
                {
                  color:
                    selectedOption &&
                    selectedOption[`NWA_${currentActive}_AC`] ==
                      +(item?.to_wallet || item?.to)
                      ? themeColors.aquaColor
                      : themeColors.lightred,
                },
              ]}>
              {item?.contractType
                ? item.tokenAddress ==
                  '0x94d407d1860841e9a531d754ec5a6de7d899113d'
                  ? 'SNFT'
                  : 'NFT'
                : numberWithCommas((item?.value / 10 ** 18).toString())}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Layout>
      <Header
        leftChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => goBack()}>
              <BackIcon color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
        childStyle={styles.childStyle}
        centerStyle={styles.centerStyle}
        rightStyle={styles.childStyle}
        title={false}
        centerTitle="Transaction History"
        rightChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Search color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
      />
      <View style={styles.listContainer}>
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : filterTransactionHistory ? (
          <FlatList
            data={filterTransactionHistory}
            renderItem={({item, index}) => renderItem(item, index)}
            //@ts-ignore
            keyExtractor={(item, index) => item + index}
          />
        ) : (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFonudText}>History not found</Text>
          </View>
        )}
      </View>
    </Layout>
  );
};

export default TokenTransactionHistory;
const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    paddingHorizontal: 1,
    flexDirection: 'row',
    // backgroundColor: 'tan',
  },
  header: {
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
    color: themeColors.garyColor,
  },
  title: {
    fontSize: 24,
  },
  listContainer: {
    flex: 1,
    marginHorizontal: moderateScale(22),
    marginTop: moderateScale(10),
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContianer: {
    paddingVertical: 4,
  },
  imgContainer: {},
  firstCointanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(7),
  },
  firstCointanierItem: {
    flex: 0.68,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    borderColor: themeColors.garyColor,
    borderRadius: 50,
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.darkGray,
  },
  tokenNameContainer: {
    flex: 1,
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

  mainContainer: {},
  buttonTitle: {
    color: themeColors.secondaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.default,
    fontWeight: '400',
    textAlign: 'center',
  },
  rightContainer: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  depositStyle: {
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
  },
  notFoundContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFonudText: {
    color: themeColors.primaryColor,
    fontSize: size.lg,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
  },
});
