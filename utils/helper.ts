import { Dimensions } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { NAPA_TOKEN } from '../connectivity/addressHelper/addressHelper';
import {
  getCustomTokenWalletBalance,
  getNativeTokenWalletBalance,
  getOtherTokenWalletBalance,
} from '../services/AssetManagement';
import { getImportedTokens } from '../services/GetImportedToken';
import moment from 'moment';
import { exitClub } from '../services/FollowAndFollowing';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleGetImage = async (
  selectImage: string,
  setMedia: CallableFunction,
) => {
  try {
    const check = selectImage?.includes('.jpg');
    const checkIphone = selectImage?.includes('ph://');
    if (check) {
      setMedia({ video: '', image: selectImage });
    } else if (checkIphone) {
      setMedia({ video: '', image: selectImage });
    } else {
      setMedia({ image: '', video: selectImage });
    }
  } catch (e) { }
};

export const validateEmail = (email: any) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const { width, height } = Dimensions.get('window');

export const handleGetImportedTokens = async (
  profileId: any,
  account: any,
  currentActive: string,
  networkType: string,
) => {
  try {
    const selectedAccount = account?.find(
      (val: any, index: number) =>
        val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
    );
    const { data }: any = await getImportedTokens(
      selectedAccount[`NWA_${currentActive}_AC`],
      networkType,
    );
    let modifiedList: any = [];
    let otherTokens: any = [];
    if (data?.data.length) {
      const tokensList: any = data?.data;
      await Promise.all(
        tokensList.map(async (token: any, index: number) => {
          if (token.tokenAddresses == NAPA_TOKEN) {
            const balanceData: any = await getNativeTokenWalletBalance(
              profileId,
              networkType,
            );
            token.balance =
              (balanceData?.data?.data?.NativeTokenWalletBalance[0]?.balance ||
                0) /
              10 ** 18;
            modifiedList.push(token);
          } else if (token.symbol == 'ETH' || token.symbol == 'SepoliaETH') {
            const response: any = await getCustomTokenWalletBalance(
              networkType,
              profileId,
            );
            token.balance =
              (response?.data?.data?.CustomTokenWalletBalance || 0) / 10 ** 18;
            modifiedList.push(token);
          } else {
            otherTokens.push(token.tokenAddresses);
          }
          if (index == tokensList.length - 1) {
            const balanceData: any = await getOtherTokenWalletBalance(
              profileId,
              networkType,
              otherTokens.join(','),
            );
            tokensList
              .filter(
                (token: any) =>
                  token.tokenAddresses != NAPA_TOKEN &&
                  token.symbol != 'ETH' &&
                  token.symbol != 'SepoliaETH',
              )
              .map((tokens: any, i: number) => {
                const token =
                  balanceData?.data?.data?.OtherTokenWalletBalance.find(
                    (balanceToken: any) =>
                      balanceToken?.token_address?.toLowerCase() ===
                      tokens?.tokenAddresses?.toLowerCase(),
                  );
                modifiedList.push({
                  ...tokens,
                  balance: (token?.balance || 0) / 10 ** 18,
                });
              });
          }
        }),
      );
    }
    const test: any = [];
    modifiedList.map((item: any, index: number) => {
      test.push({
        tokenAddresses: item.tokenAddresses,
        balance: item.balance || 0,
        symbol: item.symbol,
        name: item.name,
        value: index,
      });
    });
    return modifiedList;
  } catch (e) {
    console.log(e, 'token Error');
    throw e;
  }
};

export const getEndDate = (timestamp: any) => {
  const date = new Date(timestamp).getTime();
  const endTime = new Date(date + 12 * 3600 * 1000);
  return moment(endTime).format('h:mm:ss a');
};

export const calculateAmountEarned = (
  tokenPrice: number,
  payoutsCategory: string,
) => {
  if (payoutsCategory == '0') {
    return (tokenPrice * 0).toFixed(2);
  } else if (payoutsCategory == '1') {
    return (tokenPrice * 0.2).toFixed(2);
  } else if (payoutsCategory == '2') {
    return (tokenPrice * 0.4).toFixed(2);
  } else if (payoutsCategory == '3') {
    return (tokenPrice * 0.6).toFixed(2);
  } else if (payoutsCategory == '4') {
    return (tokenPrice * 0.8).toFixed(2);
  } else {
    return (tokenPrice * 1.0).toFixed(2);
  }
};

export const resetStack = (
  navigation: any,
  screenName: string,
  params?: any,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screenName, params: params }],
    }),
  );
};


export const payoutsCategoryName = (category: string) => {
  if (category == '0') {
    return 'Waiting For Awards';
  } else if (category == '1') {
    return 'Step Your Game Up';
  } else if (category == '2') {
    return 'On Your Way to Stardom';
  } else if (category == '3') {
    return 'This Post is Fire';
  } else if (category == '4') {
    return 'Wait, Did You See That...';
  } else {
    return 'NAPA Sensation';
  }
};

export const formatString = (str: string) => {
  if (str) {
    return str.substring(0, 6) + '...' + str.substring(str.length - 6);
  }
  return '';
};

export const isAlreadyFan = (followingList: any, profileId: any) => {
  const isFan = followingList?.findIndex(
    (p: any) => p.profileId == profileId,
  );
  if (isFan > -1) {
    return true;
  } else {
    return false;
  }
};


export const handleGetFCMToken = async () => {
  const token = await AsyncStorage.getItem('fcmToken');
  return token || '';
};


export const valueInNapaToken = (category: string) => {
  if (category == '0') {
    return '0.00000000';
  } else if (category == '1') {
    return '0.20000000';
  } else if (category == '2') {
    return '0.40000000';
  } else if (category == '3') {
    return '0.60000000';
  } else if (category == '4') {
    return '0.80000000';
  } else {
    return '1.00000000';
  }
};