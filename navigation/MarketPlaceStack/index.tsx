import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../../typings/screens-enums';
import {ScreensType} from '../../typings/stack-screens';
import MarketPlaceDetailSNFT from '../../components/MarketPlaceDetailSNFT';
import MarketPlaceDetail from '../../screens/MarketPlaceDetail';
import Sell from '../../screens/Sell';
import SellNftDetails from '../../screens/SellNftDetails';
import MarketPlace from '../../screens/MarketPlaceScreen';
import SubmitOffer from '../../components/SubmitOffer';
import MarketplaceFilter from '../../components/MarketplaceFilter';
import SuccessfulTransaction from '../../components/SuccessfulTransaction';
import BuySNFT from '../../components/BuySNFT';

const Stack = createNativeStackNavigator();

const MarketPlaceStack = () => {
  const screens = [
    {
      name: SCREENS.MARKETPLACE,
      component: MarketPlace,
      headerShown: false,
    },
    {
      name: SCREENS.MARKETPLACEDETAIL,
      component: MarketPlaceDetail,
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
      name: SCREENS.SUCCESSFULLTRANSCTION,
      component: SuccessfulTransaction,
      headerShown: false,
    },
    {
      name: SCREENS.BUYSNFT,
      component: BuySNFT,
      headerShown: false,
    },
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      <Stack.Navigator initialRouteName={SCREENS.MARKETPLACE}>
        {screens.map(
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

export default MarketPlaceStack;
