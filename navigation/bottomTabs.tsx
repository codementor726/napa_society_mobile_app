import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BlurView} from '@react-native-community/blur';
import EarnScreen from '../screens/EarnScreen';
import MarketplaceScreen from '../screens/MarketPlaceScreen';
import {
  HomeIcon,
  SocialArtIcon,
  EarnIcon,
  MarketPlaceIcon,
  WalletIcon,
} from '../assets/svg';
import {SCREENS} from '../typings/screens-enums';
import HomeStack from './HomeStack';
import HomeScreen from '../screens/HomeScreen';
import Wallet from '../screens/WalletScreen';
import SocialArt from '../screens/SocialArtScreen';
import WalletStack from './WalletStack';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {themeColors} from '../theme/colors';
import SocialArtStack from './SocialArtStack';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from '../store/selectors/profileDetailSelector';
import MarketPlaceStack from './MarketPlaceStack';
const Tab = createBottomTabNavigator();

type BottomIconProps = {
  children?: React.ReactNode;
  focused: any;
  title: string;
};

const BottomIcon: React.FC<BottomIconProps> = ({focused, children, title}) => {
  return (
    <View style={styles.container}>
      {children}
      <Text
        style={[
          styles.textStyle,
          {
            color: focused ? themeColors.aquaColor : themeColors.garyColor,
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};
const screens = [
  {
    name: SCREENS.SOCIAlARTSTACK,
    component: SocialArtStack,
    headerShown: false,
    label: '',
  },
  {
    name: SCREENS.HOMESTACK,
    component: HomeStack,
    headerShown: false,
    label: '',
  },
  {
    name: SCREENS.MARKETPLACESTACK,
    component: MarketPlaceStack,
    headerShown: false,
    label: '',
  },
  {
    name: SCREENS.WALLETSTACK,
    component: WalletStack,
    headerShown: false,
    label: '',
  },
  {
    name: SCREENS.EARN, //wallet
    component: EarnScreen,
    headerShown: false,
    label: '',
  },
];

const BottomTabs = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={SCREENS.SOCIAlARTSTACK}
      screenOptions={{
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarActiveTintColor: '#16E6EF',
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => {
          return (
            Platform.OS === 'ios' && (
              <BlurView
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                }}
                blurType="dark"
                blurAmount={15}
                reducedTransparencyFallbackColor="#192020"
                overlayColor="#192020"
              />
            )
          );
        },
      }}>
      {screens.map(({name, component, headerShown, label}, index) => {
        return (
          <Tab.Screen
            // listeners={{
            //   tabPress: e => {
            //     if (name === SCREENS.EARN) {
            //       e.preventDefault();
            //     } // <-- this function blocks navigating to screen
            //   },
            // }}
            key={`bottom-tabs-${index}`}
            name={name}
            component={component}
            options={({route}) => ({
              headerShown,
              tabBarLabel: label,
              tabBarStyle: {
                display: [
                  SCREENS.HOMESTACK,
                  SCREENS.SOCIAlARTSTACK,
                  SCREENS.PROFILE,
                  SCREENS.SPLASH,
                  SCREENS.TOUCHIDSETUP,
                  SCREENS.ASSETS,
                  SCREENS.TRENDING,
                  SCREENS.ARTICLE,
                  SCREENS.PAYOUT,
                  SCREENS.MINTINGPOST,
                  SCREENS.CAMERA,
                  SCREENS.DEPOSITSCREEN,
                  SCREENS.CREATEPROFILE,
                  SCREENS.CREATENEWPOSTDETAIL,
                  SCREENS.CREATENEWPOSTEDIT,
                  SCREENS.CREATEMARKETPOST,
                  SCREENS.MARKETPLACEDETAIL,
                  SCREENS.QRCODESCANNER,
                  SCREENS.QRAUTHORIZE,
                  SCREENS.WALLETDETAILS,
                  SCREENS.RECOVERYSCREEN,
                  SCREENS.CHOOSEAUDIENCE,
                  SCREENS.SELECTNETWORK,
                  SCREENS.TRANSACTIONHISTORY,
                  SCREENS.WALLETSETTING,
                  SCREENS.WALLETCURRENCY,
                  SCREENS.WITHDRAWAL,
                  SCREENS.IMPORTTOKEN,
                  SCREENS.ADDIMPORTACCOUNT,
                  SCREENS.RECOVERYPHRASE,
                  SCREENS.STREAMTITLE,
                  SCREENS.STREAMTITLEITEM,
                  SCREENS.LIVEVIDEO,
                  SCREENS.VIDEOSTREAMITEM,
                  SCREENS.JOINERVIDEOITEM,
                  SCREENS.LIVESTREAMEND,
                  SCREENS.JOINERLIVEVIDEO,
                  SCREENS.JOINERBUY,
                  SCREENS.PLACEBID,
                  SCREENS.PURCHASESTREAMITEM,
                  SCREENS.AUTHENTICATEVERIFY,
                  SCREENS.TOKENTRANSACTIONHISTORY,
                  SCREENS.POSTCOMMENTS,
                  SCREENS.PINAUTH,
                  SCREENS.CONFIRMPINAUTH,
                  SCREENS.SELLNFTDETAILS,
                  SCREENS.SELL,
                  SCREENS.MARKETPLACEDETAILSNFT,
                  SCREENS.SUBMITOFFER,
                  SCREENS.BUYMODAL,
                  SCREENS.MarketplaceFilter,
                  SCREENS.ONBOARDINGPOST,
                  SCREENS.ONBOARDINGMINT,
                  SCREENS.ONBOARDINGEARNING,
                  SCREENS.ONBOARDINGEARNMORE,
                  SCREENS.ONBOARDINGECOSYSTEM,
                  SCREENS.ONBOARDINGSCREENS,
                  SCREENS.SETTINGS,
                  SCREENS.REFERENCE,
                  SCREENS.PRIVACYPOLICY,
                  SCREENS.HELP,
                  SCREENS.FAQ,
                  SCREENS.LANGUAGE,
                  SCREENS.TRANSACTIONAUTH,
                  SCREENS.TERMCONDITIONS,
                  SCREENS.EVENTS,
                  SCREENS.FANSSCREEN,
                  SCREENS.POSTDETAILS,
                  SCREENS.NFTDETAILPAGE,
                  SCREENS.SUCCESSFULLTRANSCTION,
                  SCREENS.BUYSNFT,
                  SCREENS.NAPAVIDEOS,
                  SCREENS.NAPAFULLVIDEOS,
                  SCREENS.SEARCHSCREEN,
                  SCREENS.LOGINPINAUTH,
                  SCREENS.CHATSCREEN,
                ].includes(getFocusedRouteNameFromRoute(route) as any)
                  ? 'none'
                  : show || isLoggedIn
                  ? 'flex'
                  : 'none',
                backgroundColor: 'black',
                height: 70,
                paddingBottom: Platform.OS === 'ios' ? 5 : 0,
                position: 'absolute',
                borderTopWidth: 0,
                zIndex: 0,
                paddingTop: 22,
                alignItems: 'center',
                justifyContent: 'center',
              },
              tabBarIcon: ({color, focused}) => {
                if (name.includes(SCREENS.SOCIAlARTSTACK)) {
                  return (
                    <BottomIcon
                      focused={focused}
                      title="Social Art"
                      children={
                        <SocialArtIcon
                          color={color}
                          opacity={focused ? 1 : 0.5}
                        />
                      }
                    />
                  );
                }
                if (name.includes(SCREENS.HOMESTACK)) {
                  return (
                    <BottomIcon
                      focused={focused}
                      title="My Hub"
                      children={
                        <HomeIcon color={color} opacity={focused ? 1 : 0.5} />
                      }
                    />
                  );
                }
                if (name.includes(SCREENS.MARKETPLACESTACK)) {
                  return (
                    <BottomIcon
                      focused={focused}
                      title="Marketplace"
                      children={
                        <MarketPlaceIcon
                          color={color}
                          opacity={focused ? 1 : 0.5}
                        />
                      }
                    />
                  );
                }
                if (name.includes(SCREENS.WALLETSTACK)) {
                  return (
                    <BottomIcon
                      focused={focused}
                      title="Wallet"
                      children={
                        <WalletIcon color={color} opacity={focused ? 1 : 0.5} />
                      }
                    />
                  );
                }
                if (name.includes(SCREENS.EARN)) {
                  return (
                    <BottomIcon
                      focused={focused}
                      title="Earn"
                      children={
                        <EarnIcon color={color} opacity={focused ? 1 : 0.5} />
                      }
                    />
                  );
                }
              },
            })}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: size.xs,
    fontFamily: Fontfamily.Avenier,
    lineHeight: size.vxlg,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
