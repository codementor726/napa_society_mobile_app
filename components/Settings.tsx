import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {BackIcon, NotificationIcon} from '../assets/svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme/colors';
import {moderateScale} from 'react-native-size-matters';
import {WordIcon} from '../assets/svg/WordIcon';
import {SupportIcon} from '../assets/svg/SupportIcon';
import {TermIcon} from '../assets/svg/TermIcon';
import {ProtectIcon} from '../assets/svg/ProtectIcon';
import {LogoutIcon} from '../assets/svg/LogoutIcon';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {RightarrowIcon} from '../assets/svg/RightarrowIcon';
import ToggleSwitch from 'toggle-switch-react-native';
import {SCREENS} from '../typings/screens-enums';
import FaqIcon from '../assets/svg/FaqIcon';
import {BlurView} from '@react-native-community/blur';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfileData, setIsLoggedIn} from '../store/slices/ProfileDetail';
import {notificationStatus} from '../services/AuthApi';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import Notifee, {AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Settings = () => {
  const {goBack, navigate} = useNavigation<any>();
  const dispatch = useDispatch();
  const [isLogOut, setIsLogOut] = React.useState(false);
  const user = useSelector(selectProfileList);
  const [pushNotifications, setPushNotifications] = React.useState<any>();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    setPushNotifications(user?.allowNotifications == 'true' ? true : false);
  }, [user]);

  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    setTimeout(() => {
      setIsLogOut(false);
      navigate(SCREENS.TOUCHIDSETUP);
    }, 50);
  };

  const settingsData: any = [
    {
      id: 1,
      title: 'Language',
      icon: <WordIcon />,
      tab: SCREENS.LANGUAGE,
    },
    // {
    //   id: 2,
    //   title: 'Refer Friend',
    //   icon: <InviteIcon height={24} width={24} />,
    //   tab: SCREENS.REFERENCE,
    // },
    {
      id: 3,
      title: 'Help & Support',
      icon: <SupportIcon />,
      tab: SCREENS.HELP,
    },
    {
      id: 4,
      title: 'FAQ',
      icon: <FaqIcon />,
      tab: SCREENS.FAQ,
    },
    {
      id: 5,
      title: 'Creator Terms & Conditions',
      icon: <TermIcon />,
      tab: SCREENS.TERMCONDITIONS,
    },
    {
      id: 6,
      title: 'Privacy Policy',
      icon: <ProtectIcon />,
      tab: SCREENS.PRIVACYPOLICY,
    },
  ];

  const handleNotification = async (notification: any) => {
    setLoading(true);
    const {data, error, message}: any = await notificationStatus(
      user?.profileId,
      notification,
    );
    if (error) {
      console.log(message, 'error notification');
      await AsyncStorage.setItem('notification', notification);
      setLoading(false);
      return;
    }
    await AsyncStorage.setItem('notification', notification);
    dispatch(fetchProfileData({emailAddress: user?.emailAddress})).then(
      (data: any) => {
        handleFetch();
        setLoading(false);
      },
    );
  };

  const handleFetch = async () => {
    await Notifee.requestPermission();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log(authStatus, 'authStatus');
    }
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
        centerTitle={
          <Text
            style={{
              color: themeColors.primaryColor,
            }}>
            Settings
          </Text>
        }
      />
      <View style={{marginHorizontal: moderateScale(20)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.mainContainer}>
            <View style={styles.iconContainer}>
              <NotificationIcon width={24} height={24} />
            </View>
            <Text style={[styles.text]}>Push Notifications</Text>
          </View>
          <ToggleSwitch
            isOn={pushNotifications}
            onColor={themeColors.aquaColor}
            offColor={themeColors.garyColor}
            disabled={loading}
            onToggle={() => {
              if (pushNotifications) {
                handleNotification('false');
              } else {
                handleNotification('true');
              }
            }}
          />
        </View>
        <View>
          {settingsData?.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.Container}
                onPress={() => {
                  //@ts-ignore
                  navigate(item?.tab);
                }}>
                <View style={styles.mainContainer} key={item.id}>
                  <View style={styles.iconContainer}>{item.icon}</View>
                  <View>
                    <Text style={styles.text}>{item.title}</Text>
                    {item.title === 'Language' && (
                      <Text
                        style={[
                          styles.text,
                          {color: themeColors.garyColor, fontSize: size.sl},
                        ]}>
                        English
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <RightarrowIcon />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.mainContainer}
          onPress={() => setIsLogOut(true)}>
          <View style={styles.iconContainer}>
            <LogoutIcon />
          </View>
          <Text style={[styles.text, {color: themeColors.lightred}]}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={isLogOut}>
        <View style={styles.modalContainer}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            overlayColor="transparent"
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.modalMainContainer}>
            <View>
              <Text style={[styles.modalLogoutText]}>Log Out</Text>
              <Text style={[styles.modalDescription]}>
                Are you sure you want to Log Out?
              </Text>
            </View>
            <View style={[styles.bottonContainer]}>
              <TouchableOpacity onPress={() => handleLogout()}>
                <Text
                  style={[
                    styles.modalText,
                    {color: themeColors.lightred, paddingRight: 50},
                  ]}>
                  Log Out
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsLogOut(false);
                }}>
                <Text style={[styles.modalText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

export default Settings;

const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },

  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(10),
  },
  iconContainer: {
    backgroundColor: themeColors.cardsColor,
    padding: 10,
    borderRadius: 25,
  },
  text: {
    color: themeColors.primaryColor,
    marginLeft: 10,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
  },
  modalMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalLogoutText: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.vxlg,
    color: themeColors.primaryColor,
    fontWeight: '400',
    textAlign: 'center',
  },
  modalDescription: {
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    color: themeColors.primaryColor,
    fontWeight: '500',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.md,
    color: themeColors.primaryColor,
    fontWeight: '400',
    textAlign: 'center',
  },
  bottonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '50%',
  },
});
