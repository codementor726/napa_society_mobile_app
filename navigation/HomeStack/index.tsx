import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ApplyEventScreen from '../../screens/ApplyEventScreen';
import {SCREENS} from '../../typings/screens-enums';
import {ScreensType} from '../../typings/stack-screens';
import AssetsScreen from '../../screens/AssetsScreen';
import PayoutScreen from '../../screens/payoutScreen';
import MarketPlaceDetail from '../../screens/MarketPlaceDetail';
import SplashScreen from '../../screens/SplashScreen';
import CreateMarketPost from '../../screens/CreateMarketPost';
import CreatNewPostEdit from '../../components/CreateNewPostEdit';
import CreatNewPostDetail from '../../components/CreateNewPostDetail';
import MintingPost from '../../components/MintingPost';
import Profile from '../../screens/Profile';
import CameraScreen from '../../screens/Camera';
import SocialArt from '../../screens/SocialArtScreen';
import DepositScreen from '../../screens/DepositScreen';
import Touchidsetup from '../../screens/Touchidsetup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QrCodeScanner from '../../components/QrCodeScanner';
import QrAuthorize from '../../components/QrAuthorize';
import CreateProfile from '../../screens/Createprofile';
import Wallet from '../../screens/WalletScreen';
import WalletScreen from '../../screens/WalletScreen';
import WalletCurrency from '../../screens/WalletCurrency';
import RecoveryScreen from '../../screens/RecoveryScreen';
import HomeScreen from '../../screens/HomeScreen';
import TrendingScreen from '../../screens/Trending';
import ChooseAudience from '../../screens/ChooseAudience';
import ArticleScreen from '../../screens/ArticleScreen';
import WalletDetails from '../../screens/WalletDetails';
import SelectNetworkScreen from '../../screens/Wallet/SelectNetwork';
import WalletSettingScreen from '../../screens/Wallet/WalletSetting';
import WithDrawalScreen from '../../screens/Wallet/WithDrawal';
import FansScreen from '../../screens/FansScreen';
import ChatListScreen from '../../screens/ChatListScreen';
import ChatScreen from '../../screens/ChatScreen';
import SellNftDetails from '../../screens/SellNftDetails';
import Sell from '../../screens/Sell';
import TokenTransactionHistory from '../../screens/Wallet/TokenTransactionHistory';
import Events from '../../components/Events';
import Reference from '../../components/Reference';
import PrivacyPolicy from '../../components/PrivacyPolicy';
import Help from '../../components/Help';
import Language from '../../components/Language';
import TermsConditions from '../../components/TermsConditions';
import PostDetail from '../../components/PostDetail';
import Faq from '../../components/Faq';
import Settings from '../../components/Settings';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const screens = [
    {
      name: SCREENS.CREATEPROFILE,
      component: CreateProfile,
      headerShown: false,
    },
    {
      name: SCREENS.RECOVERYSCREEN,
      component: RecoveryScreen,
      headerShown: false,
    },
    {
      name: SCREENS.HOME,
      component: HomeScreen,
      headerShown: false,
    },
    {
      name: SCREENS.SPLASH,
      component: SplashScreen,
      headerShown: false,
    },
    {
      name: SCREENS.APPLYEVENT,
      component: ApplyEventScreen,
      headerShown: false,
    },
    {
      name: SCREENS.ASSETS,
      component: AssetsScreen,
      headerShown: false,
    },

    {
      name: SCREENS.PAYOUT,
      component: PayoutScreen,
      headerShown: false,
    },
    {
      name: SCREENS.MARKETPLACEDETAIL,
      component: MarketPlaceDetail,
      headerShown: false,
    },
    {
      name: SCREENS.CREATEMARKETPOST,
      component: CreateMarketPost,
      headerShown: false,
    },
    {
      name: SCREENS.CREATENEWPOSTDETAIL,
      component: CreatNewPostDetail,
      headerShown: false,
    },
    {
      name: SCREENS.CREATENEWPOSTEDIT,
      component: CreatNewPostEdit,
      headerShown: false,
    },
    {
      name: SCREENS.MINTINGPOST,
      component: MintingPost,
      headerShown: false,
    },
    {
      name: SCREENS.PROFILE,
      component: Profile,
      headerShown: false,
    },
    {
      name: SCREENS.CAMERA,
      component: CameraScreen,
      headerShown: false,
    },
    {
      name: SCREENS.DEPOSITSCREEN,
      component: DepositScreen,
      headerShown: false,
    },
    {
      name: SCREENS.QRCODESCANNER,
      component: QrCodeScanner,
      headerShown: false,
    },
    {
      name: SCREENS.TRENDING,
      component: TrendingScreen,
      headerShown: false,
    },
    {
      name: SCREENS.ARTICLE,
      component: ArticleScreen,
      headerShown: false,
    },
    {
      name: SCREENS.QRAUTHORIZE,
      component: QrAuthorize,
      headerShown: false,
    },
    {
      name: SCREENS.WALLETSCREEN,
      component: WalletScreen,
      headerShown: false,
    },
    {
      name: SCREENS.WALLETCURRENCY,
      component: WalletCurrency,
      headerShown: false,
    },
    {
      name: SCREENS.CHOOSEAUDIENCE,
      component: ChooseAudience,
      headerShown: false,
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
      name: SCREENS.WALLETSETTING,
      component: WalletSettingScreen,
      headerShown: false,
    },
    {
      name: SCREENS.WITHDRAWAL,
      component: WithDrawalScreen,
      headerShown: false,
    },
    {
      name: SCREENS.FANSSCREEN,
      component: FansScreen,
      headerShown: false,
    },
    {
      name: SCREENS.CHATLISTSCREEN,
      component: ChatListScreen,
      headerShown: false,
    },
    {
      name: SCREENS.CHATSCREEN,
      component: ChatScreen,
      headerShown: false,
    },
    {
      name: SCREENS.SELLNFTDETAILS,
      component: SellNftDetails,
      headerShown: false,
    },
    {
      name: SCREENS.SELL,
      component: Sell,
      headerShown: false,
    },
    {
      name: SCREENS.TOKENTRANSACTIONHISTORY,
      component: TokenTransactionHistory,
      headerShown: false,
    },
    {
      name: SCREENS.EVENTS,
      component: Events,
      headerShown: false,
    },
    {
    name: SCREENS.SETTINGS,
    component: Settings,
    headerShown: false,
    label: '',
  },
  {
    name: SCREENS.REFERENCE,
    component: Reference,
    headerShown: false,
    label: '',
  },
  {
    name: SCREENS.PRIVACYPOLICY,
    component: PrivacyPolicy,
    headerShown: false,
    label: '',
  },
  {
    name: SCREENS.HELP,
    component: Help,
    headerShown: false,
    label: '',
  },
  {
    name: SCREENS.FAQ,
    component: Faq,
    headerShown: false,
    label: '',
  },
  {
    name: SCREENS.LANGUAGE,
    component: Language,
    headerShown: false,
    label: '',
  },
  {
    name: SCREENS.TERMCONDITIONS,
    component: TermsConditions,
    headerShown: false,
    label: '',
  },
  {
    name: SCREENS.FANSOFCARD,
    component: FansScreen,
    headerShown: false,
    label: '',
  },
  {
    name: SCREENS.POSTDETAILS,
    component: PostDetail,
    headerShown: false,
    label: '',
  },
  ];
  const [loading, setLoading] = useState(true);
  let walletAddress;
  const [checkScreen, setcheckScreen] = useState('');
  const wallet = async () => {
    walletAddress = await AsyncStorage.getItem('walletAddress');
    if (walletAddress) {
      setcheckScreen(SCREENS.TOUCHIDSETUP);
    } else {
      setcheckScreen(SCREENS.CREATEPROFILE);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      <Stack.Navigator initialRouteName={SCREENS.HOME}>
        {screens.map(
          //@ts-ignore
          ({name, component, headerShown}: ScreensType, index: number) => {
            return (
              <Stack.Screen
                key={`home-stack-${index}`}
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

export default HomeStack;
