import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ApplyEventScreen from '../../screens/ApplyEventScreen';
import {SCREENS} from '../../typings/screens-enums';
import {ScreensType} from '../../typings/stack-screens';
import Wallet from '../../screens/WalletScreen';
import WalletDetails from '../../screens/WalletDetails';
import SelectNetworkScreen from '../../screens/Wallet/SelectNetwork';
import DepositScreen from '../../screens/DepositScreen';
import TransactionHistory from '../../screens/Wallet/TransactionHistory';
import WalletSettingScreen from '../../screens/Wallet/WalletSetting';
import WalletCurrencyScreen from '../../screens/WalletCurrency';
import WithDrawalScreen from '../../screens/Wallet/WithDrawal';
import ImportTokenScreen from '../../screens/Wallet/ImportToken';
import AddImportAccountScreen from '../../screens/Wallet/AddImportAccount';
import RecoveryPhraseScreen from '../../screens/Wallet/RecoveryPhrase';
import TouchIdLogin from '../../components/TouchIdLogin';
import AuthenticateVerify from '../../screens/AuthenticateVerify';
import TokenTransactionHistory from '../../screens/Wallet/TokenTransactionHistory';
import WithDrawalToken from '../../screens/Wallet/WithDrawalToken';
import TransactionAuth from '../../components/TranscationAuth';
import MarketPlaceDetailSNFT from '../../components/MarketPlaceDetailSNFT';
import Sell from '../../screens/Sell';
import SellNftDetails from '../../screens/SellNftDetails';
import SubmitOffer from '../../components/SubmitOffer';
import MarketplaceFilter from '../../components/MarketplaceFilter';
import MarketPlaceDetail from '../../screens/MarketPlaceDetail';
import NftDetailPage from '../../components/NftDetailPage';
import NftFixedPrice from '../../components/NftFixedPrice';

const Stack = createNativeStackNavigator();

const WalletStack = () => {
  const screens = [
    {
      name: SCREENS.WALLETSCREEN,
      component: Wallet,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.WALLETDETAILS,
      component: WalletDetails,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.SELECTNETWORK,
      component: SelectNetworkScreen,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.DEPOSITSCREEN,
      component: DepositScreen,
      headerShown: false,
    },
    {
      name: SCREENS.TRANSACTIONHISTORY,
      component: TransactionHistory,
      headerShown: false,
    },
    {
      name: SCREENS.WALLETSETTING,
      component: WalletSettingScreen,
      headerShown: false,
    },
    {
      name: SCREENS.WALLETCURRENCY,
      component: WalletCurrencyScreen,
      headerShown: false,
    },
    {
      name: SCREENS.WITHDRAWAL,
      component: WithDrawalScreen,
      headerShown: false,
    },
    {
      name: SCREENS.IMPORTTOKEN,
      component: ImportTokenScreen,
      headerShown: false,
    },
    {
      name: SCREENS.ADDIMPORTACCOUNT,
      component: AddImportAccountScreen,
      headerShown: false,
    },
    {
      name: SCREENS.RECOVERYPHRASE,
      component: RecoveryPhraseScreen,
      headerShown: false,
    },
    {
      name: SCREENS.AUTHENTICATEVERIFY,
      component: AuthenticateVerify,
      headerShown: false,
    },
    {
      name: SCREENS.TOKENTRANSACTIONHISTORY,
      component: TokenTransactionHistory,
      headerShown: false,
    },
    {
      name: SCREENS.WITHDRAWALTOKEN,
      component: WithDrawalToken,
      headerShown: false,
    },
    {
      name: SCREENS.TRANSACTIONAUTH,
      component: TransactionAuth,
      headerShown: false,
    },
    {
      name: SCREENS.MARKETPLACEDETAILSNFT,
      component: MarketPlaceDetailSNFT,
      headerShown: false,
    },
    {
      name: SCREENS.SELL,
      component: Sell,
      headerShown: false,
    },
    {
      name: SCREENS.SELLNFTDETAILS,
      component: SellNftDetails,
      headerShown: false,
    },
    {
      name: SCREENS.SUBMITOFFER,
      component: SubmitOffer,
      headerShown: false,
    },
    {
      name: SCREENS.MarketplaceFilter,
      component: MarketplaceFilter,
      headerShown: false,
    },
    {
      name: SCREENS.MARKETPLACEDETAIL,
      component: MarketPlaceDetail,
      headerShown: false,
    },
    {
      name: SCREENS.NFTDETAILPAGE,
      component: NftDetailPage,
      headerShown: false,
    },
    {
      name: SCREENS.NFTFIXEDPRICE,
      component: NftFixedPrice,
      headerShown: false,
    },
  ];

  return (
    <>
      <Stack.Navigator initialRouteName={SCREENS.WALLETSCREEN}>
        {screens.map(
          //@ts-ignore
          ({name, component, headerShown}: ScreensType, index: number) => {
            return (
              <Stack.Screen
                key={`wallet-stack-${index}`}
                name={name}
                component={component}
                options={{
                  headerShown,
                }}
              />
            );
          },
        )}
      </Stack.Navigator>
    </>
  );
};

export default WalletStack;
