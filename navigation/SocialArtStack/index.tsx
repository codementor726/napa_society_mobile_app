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
import WalletScreen from '../../screens/WalletScreen';
import WalletCurrency from '../../screens/WalletCurrency';
import RecoveryScreen from '../../screens/RecoveryScreen';
import TrendingScreen from '../../screens/Trending';
import ChooseAudience from '../../screens/ChooseAudience';
import FansScreen from '../../screens/FansScreen';
import ChatListScreen from '../../screens/ChatListScreen';
import ChatScreen from '../../screens/ChatScreen';
import SellNftDetails from '../../screens/SellNftDetails';
import StreamTitle from '../../screens/StreamTitle';
import StreamTitleItem from '../../screens/StreamTitleItem';
import Sell from '../../screens/Sell';
import LiveVideo from '../../screens/LiveVideo';
import VideoStreamItem from '../../screens/VideoStreamItem';
import JoinerVideoItem from '../../screens/JoinerVideoItem';
import LiveStreamEnd from '../../screens/LiveStreamEnd';
import JoinerLiveVideo from '../../screens/JoinerLiveVideo';
import JoinerBuy from '../../screens/JoinerBuyScreen';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../../store/selectors/profileDetailSelector';
import PurchaseStreamItem from '../../screens/PurchaseStreamItem';
import PlaceBid from '../../screens/PlaceBid';
import Postcomments from '../../components/Postcomments';
import PinAuth from '../../screens/PinAuth';
import ConfirmPinAuth from '../../screens/ConfirmPinAuth';
import LoginPinAuth from '../../screens/LoginPinAuth';
import {fetchProfileData} from '../../store/slices/ProfileDetail';
import MarketPlaceDetailSNFT from '../../components/MarketPlaceDetailSNFT';
import BuyModal from '../../common/BuyModal';
import MarketPlace from '../../screens/MarketPlaceScreen';
import OnboardingPost from '../../common/onboardingScreens/OnboardingPost';
import OnboardingMint from '../../common/onboardingScreens/OnboardingMint';
import OnboardingEarning from '../../common/onboardingScreens/OnboardingEarning';
import OnboardingEarnmore from '../../common/onboardingScreens/OnboardingEarnmore';
import OnboardingEcosystem from '../../common/onboardingScreens/OnboardingEcosystem';
import OnboardingScreens from '../../components/OnboardingScreens';
import Settings from '../../components/Settings';
import Reference from '../../components/Reference';
import PrivacyPolicy from '../../components/PrivacyPolicy';
import Help from '../../components/Help';
import Faq from '../../components/Faq';
import Language from '../../components/Language';
import TermsConditions from '../../components/TermsConditions';
import PostDetail from '../../components/PostDetail';
import NapaVideos from '../../components/NapaVideos';
import NapaFullVideos from '../../screens/NapaFullVideos';
import SearchScreen from '../../components/SearchScreen';
const Stack = createNativeStackNavigator();

const SocialArtStack = () => {
  const screens = [
    {
      name: SCREENS.TOUCHIDSETUP,
      component: Touchidsetup,
      headerShown: false,
    },
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
      name: SCREENS.SOCIALART,
      component: SocialArt,
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
      name: SCREENS.STREAMTITLE,
      component: StreamTitle,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.STREAMTITLEITEM,
      component: StreamTitleItem,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.LIVEVIDEO,
      component: LiveVideo,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.VIDEOSTREAMITEM,
      component: VideoStreamItem,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.JOINERVIDEOITEM,
      component: JoinerVideoItem,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.LIVESTREAMEND,
      component: LiveStreamEnd,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.JOINERLIVEVIDEO,
      component: JoinerLiveVideo,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.JOINERBUY,
      component: JoinerBuy,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.PURCHASESTREAMITEM,
      component: PurchaseStreamItem,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.PLACEBID,
      component: PlaceBid,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.POSTCOMMENTS,
      component: Postcomments,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.PINAUTH,
      component: PinAuth,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.CONFIRMPINAUTH,
      component: ConfirmPinAuth,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.LOGINPINAUTH,
      component: LoginPinAuth,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.MARKETPLACEDETAILSNFT,
      component: MarketPlaceDetailSNFT,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.BUYMODAL,
      component: BuyModal,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.MARKETPLACE,
      component: MarketPlace,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.ONBOARDINGPOST,
      component: OnboardingPost,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.ONBOARDINGMINT,
      component: OnboardingMint,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.ONBOARDINGEARNING,
      component: OnboardingEarning,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.ONBOARDINGECOSYSTEM,
      component: OnboardingEcosystem,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.ONBOARDINGSCREENS,
      component: OnboardingScreens,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.ONBOARDINGEARNMORE,
      component: OnboardingEarnmore,
      headerShown: false,
      label: '',
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
    {
      name: SCREENS.NAPAVIDEOS,
      component: NapaVideos,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.NAPAFULLVIDEOS,
      component: NapaFullVideos,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.SEARCHSCREEN,
      component: SearchScreen,
      headerShown: false,
      label: '',
    },
  ];
  const screens2 = [
    {
      name: SCREENS.SOCIALART,
      component: SocialArt,
      headerShown: false,
    },
    {
      name: SCREENS.CREATEPROFILE,
      component: CreateProfile,
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
      name: SCREENS.STREAMTITLE,
      component: StreamTitle,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.STREAMTITLEITEM,
      component: StreamTitleItem,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.LIVEVIDEO,
      component: LiveVideo,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.VIDEOSTREAMITEM,
      component: VideoStreamItem,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.JOINERVIDEOITEM,
      component: JoinerVideoItem,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.LIVESTREAMEND,
      component: LiveStreamEnd,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.JOINERLIVEVIDEO,
      component: JoinerLiveVideo,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.JOINERBUY,
      component: JoinerBuy,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.PURCHASESTREAMITEM,
      component: PurchaseStreamItem,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.PLACEBID,
      component: PlaceBid,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.POSTCOMMENTS,
      component: Postcomments,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.MARKETPLACEDETAILSNFT,
      component: MarketPlaceDetailSNFT,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.BUYMODAL,
      component: BuyModal,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.MARKETPLACE,
      component: MarketPlace,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.ONBOARDINGPOST,
      component: OnboardingPost,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.ONBOARDINGMINT,
      component: OnboardingMint,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.ONBOARDINGEARNING,
      component: OnboardingEarning,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.ONBOARDINGECOSYSTEM,
      component: OnboardingEcosystem,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.ONBOARDINGSCREENS,
      component: OnboardingScreens,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.ONBOARDINGEARNMORE,
      component: OnboardingEarnmore,
      headerShown: false,
      label: '',
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
    {
      name: SCREENS.NAPAVIDEOS,
      component: NapaVideos,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.NAPAFULLVIDEOS,
      component: NapaFullVideos,
      headerShown: false,
      label: '',
    },
    {
      name: SCREENS.SEARCHSCREEN,
      component: SearchScreen,
      headerShown: false,
      label: '',
    },
  ];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleNavigation: any = async () => {
    const res = await AsyncStorage.getItem('publicKey');
    console.log(res);
    if (res) {
      //@ts-ignore
      setData(res);
    }
  };

  useEffect(() => {
    handleNavigation();
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        !loading ? (
          <Stack.Navigator initialRouteName={SCREENS.TOUCHIDSETUP}>
            {/* <Stack.Navigator initialRouteName={SCREENS.SOCIALART}> */}
            {screens.map(
              ({name, component, headerShown}: any, index: number) => {
                return (
                  <Stack.Screen
                    key={`social-stack-${index}`}
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
        ) : (
          <SplashScreen />
        )
      ) : (
        <Stack.Navigator initialRouteName={SCREENS.SOCIALART}>
          {screens2.map(
            ({name, component, headerShown}: any, index: number) => {
              return (
                <Stack.Screen
                  key={`social-stack-${index}`}
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
      )}
    </>
  );
};

export default SocialArtStack;
