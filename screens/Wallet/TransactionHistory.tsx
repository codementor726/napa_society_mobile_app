import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Linking,
  ScrollView,
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
import {selectTransactionHistoryList} from '../../store/selectors/TokenHistorySelector';
import {
  selectAccountList,
  selectNapaWallet,
  selectNetworkType,
} from '../../store/selectors/NapaAccount';
import {numberWithCommas} from '../../utils/NumberWithCommas';
import {CURRENCIES} from '../../typings/currenices';
import {NapaTokenIcon} from '../../assets/svg/NapaTokenIcon';
import moment from 'moment';

const TransactionHistory = () => {
  const {goBack} = useNavigation<any>();
  const transactionList = useSelector(selectTransactionHistoryList);
  const account = useSelector(selectAccountList);
  const currentActive = useSelector(selectNapaWallet);
  const networkType = useSelector(selectNetworkType);
  const [selectedOption, setSelectedOption] = useState<any>();
  const [hundredTransaction, setHundredTransaction] = useState<any>([]);
  const [transactionDayWiseData, setTransactionDayWiseData] = useState<any>({
    todayData: [],
    yesterdayData: [],
    sevendaysData: [],
    thirtyDaysData: [],
  });

  useEffect(() => {
    if (account) {
      const selectedAccount = account?.find(
        (val: any, index: number) =>
          val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
      );
      setSelectedOption(selectedAccount);
    }
  }, [account]);

  useEffect(() => {
    if (transactionList && selectedOption) {
      const transactionHistory = transactionList?.filter((item: any) => {
        return (
          (item?.hasOwnProperty('gasPrice') &&
            selectedOption[`NWA_${currentActive}_AC`] == item?.to) ||
          !item.hasOwnProperty('gasPrice')
        );
      });
      const filterPost = transactionHistory?.slice(0, 100);
      setHundredTransaction(filterPost);
    }
  }, [transactionList, selectedOption]);

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

  useEffect(() => {
    const currentDatetime = moment();
    const todayStart = moment(currentDatetime).startOf('day');
    const yesterdayStart = moment(todayStart).subtract(1, 'day');
    const sevendaysStart = moment(todayStart).subtract(7, 'day');
    const thirtyDaysAgoStart = moment(todayStart).subtract(30, 'days');

    const todayData: any = [];
    const yesterdayData: any = [];
    const sevendaysData: any = [];
    const thirtyDaysData: any = [];

    if (hundredTransaction.length) {
      hundredTransaction?.forEach((item: any) => {
        const itemTimestamp = moment(item?.blockTimestamp);

        if (itemTimestamp.isBetween(todayStart, currentDatetime, null, '[]')) {
          todayData.push(item);
        } else if (
          itemTimestamp.isBetween(yesterdayStart, todayStart, null, '[)')
        ) {
          yesterdayData.push(item);
        } else if (
          itemTimestamp.isBetween(sevendaysStart, todayStart, null, '[)')
        ) {
          sevendaysData.push(item);
        } else if (
          itemTimestamp.isBetween(
            thirtyDaysAgoStart,
            yesterdayStart,
            null,
            '[)',
          )
        ) {
          thirtyDaysData.push(item);
        } else {
        }
      });

      todayData.sort((a: any, b: any) =>
        moment(a.timestamp).diff(moment(b.timestamp)),
      );
      yesterdayData.sort((a: any, b: any) =>
        moment(a.timestamp).diff(moment(b.timestamp)),
      );
      thirtyDaysData.sort((a: any, b: any) =>
        moment(a.timestamp).diff(moment(b.timestamp)),
      );
    }

    setTransactionDayWiseData({
      todayData,
      yesterdayData,
      sevendaysData,
      thirtyDaysData,
    });
  }, [hundredTransaction]);

  const renderItem = (item: any, index: number) => {
    return (
      <TouchableOpacity
        onPress={() => handlePress(item?.transactionHash || item?.hash)}
        key={index}
        style={styles.mainContainer}>
        <View style={[styles.firstCointanier]}>
          <View style={styles.firstCointanierItem}>
            <View style={[styles.tokenIcon]}>
              {selectedOption &&
              selectedOption[`NWA_${currentActive}_AC`] ==
                +(item?.toAddress || item?.to) ? (
                <DepositIcon height={26} width={26} />
              ) : (
                <WithdarawalIcon height={26} width={26} />
              )}
            </View>
            <View style={styles.tokenNameContainer}>
              <Text numberOfLines={1} style={styles.tokenName}>
                {selectedOption &&
                selectedOption[`NWA_${currentActive}_AC`] ==
                  +(item?.toAddress || item?.to)
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
                      +(item?.toAddress || item?.to)
                      ? themeColors.aquaColor
                      : themeColors.lightred,
                },
              ]}>
              {' '}
              {selectedOption &&
              selectedOption[`NWA_${currentActive}_AC`] ==
                +(item?.toAddress || item?.to)
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
                      +(item?.toAddress || item?.to)
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
            <TouchableOpacity onPress={goBack}>
              <BackIcon color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
        childStyle={styles.childStyle}
        centerStyle={styles.centerStyle}
        rightStyle={styles.childStyle}
        title={false}
        rightChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Search color={'#677778'} />
            </TouchableOpacity>
          </View>
        }
        children={<Text style={styles.accountName}>Transaction History</Text>}
        width={'80%'}
        rightChildrenWidth={'10%'}
        leftChildrenWidth={'10%'}
      />
      <ScrollView>
        <View style={styles.listContainer}>
          {transactionDayWiseData?.todayData.length > 0 && (
            <>
              <Text style={styles.daysTitle}>Today</Text>
              <FlatList
                data={transactionDayWiseData?.todayData}
                renderItem={({item, index}) => renderItem(item, index)}
                keyExtractor={(item, index) => item + index}
                scrollEnabled={false}
              />
            </>
          )}
          {transactionDayWiseData?.yesterdayData.length > 0 && (
            <>
              <Text style={styles.daysTitle}>Yesterday</Text>
              <FlatList
                data={transactionDayWiseData?.yesterdayData}
                renderItem={({item, index}) => renderItem(item, index)}
                keyExtractor={(item, index) => item + index}
                scrollEnabled={false}
              />
            </>
          )}
          {transactionDayWiseData?.sevendaysData?.length > 0 && (
            <>
              <Text style={styles.daysTitle}>7 days ago</Text>
              <FlatList
                data={transactionDayWiseData?.sevendaysData}
                renderItem={({item, index}) => renderItem(item, index)}
                keyExtractor={(item, index) => item + index}
                scrollEnabled={false}
              />
            </>
          )}
          {transactionDayWiseData?.thirtyDaysData?.length > 0 && (
            <>
              <Text style={styles.daysTitle}>30 days ago</Text>
              <FlatList
                data={transactionDayWiseData?.thirtyDaysData}
                renderItem={({item, index}) => renderItem(item, index)}
                keyExtractor={(item, index) => item + index}
                scrollEnabled={false}
              />
            </>
          )}
          {/* {hundredTransaction.length > 0 && (
            <>
              <Text style={styles.daysTitle}>All</Text>
              <FlatList
                data={hundredTransaction}
                renderItem={({item, index}) => renderItem(item, index)}
                keyExtractor={(item, index) => item + index}
                scrollEnabled={false}
              />
            </>
          )} */}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default TransactionHistory;
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
  daysTitle: {
    color: themeColors.garyColor,
    fontSize: size.default,
    fontWeight: '500',
    lineHeight: 19.6,
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(10),
    fontFamily: Fontfamily.Avenier,
  },
  accountName: {
    color: themeColors.primaryColor,
    fontSize: size.lg,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
  },
});
