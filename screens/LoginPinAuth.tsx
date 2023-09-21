import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {TouchIcon} from '../assets/svg/TouchIcon';
import {RemoveIcon} from '../assets/svg/RemoveIcon';
import {SCREENS} from '../typings/screens-enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {fetchProfileData, setIsLoggedIn} from '../store/slices/ProfileDetail';
import {useToast} from 'react-native-toast-notifications';
import {handleGetFCMToken} from '../utils/helper';
import ErrorToast from '../common/toasters/ErrorToast';

const LoginPinAuth = () => {
  const {navigate} = useNavigation<any>();
  const [pin, setPin] = useState<any>('');
  const dispatch = useDispatch();
  const toast = useToast();

  const handleNumber = async (value: any) => {
    setPin(pin + value);
  };

  const handleLogin = async () => {
    const emailAddress = await AsyncStorage.getItem('emailAddress');
    console.log(emailAddress, 'emailAddress');
    console.log(pin, 'pin');
    dispatch(
      fetchProfileData({
        emailAddress,
        pin,
        deviceToken: await handleGetFCMToken(),
      }),
    )
      .then((data: any) => {
        console.log(data.payload, 'data.payload');
        if (data?.payload) {
          dispatch(setIsLoggedIn(true));
          navigate(SCREENS.SOCIALART);
        } else {
          setPin('');
          toast.show(<ErrorToast message='Invalid Pin' />, {
            placement: 'top',
          });
        }
      })
      .catch((e: any) => {
        toast.show(<ErrorToast message={e} />, {
          placement: 'top',
        });
      });
  };

  useEffect(() => {
    console.log('test');
    if (pin.length == 6) {
      console.log('test 2');

      handleLogin();
      return;
    }
  }, [pin]);

  return (
    <ImageBackground
      style={{flex: 1}}
      resizeMode="cover"
      source={require('../assets/images/AuthBg.png')}>
      <Header
      // leftChildren={
      //   <View style={{flexDirection: 'row', marginTop: moderateScale(40)}}>
      //     <TouchableOpacity onPress={goBack}>
      //       <BackIcon color={'#677778'} />
      //     </TouchableOpacity>
      //   </View>
      // }
      // title={false}
      />
      <View
        style={{
          marginHorizontal: moderateScale(24),
          marginTop: moderateScale(45),
        }}>
        <View>
          <Text style={styles.pinText}>Enter 6-digit Pin Number</Text>
          <Text style={styles.instractionText}>
            A PIN number protects your data and is used to Log In
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputContainerChild}>
            <Text
              style={
                pin.length >= 1 ? styles.selectedInputText : styles.pinInputText
              }></Text>
            <Text
              style={
                pin.length >= 2 ? styles.selectedInputText : styles.pinInputText
              }></Text>
            <Text
              style={
                pin.length >= 3 ? styles.selectedInputText : styles.pinInputText
              }></Text>
            <Text
              style={
                pin.length >= 4 ? styles.selectedInputText : styles.pinInputText
              }></Text>
            <Text
              style={
                pin.length >= 5 ? styles.selectedInputText : styles.pinInputText
              }></Text>
            <Text
              style={
                pin.length >= 6 ? styles.selectedInputText : styles.pinInputText
              }></Text>
          </View>
        </View>
        <View style={styles.keybadContainer}>
          <View>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('1');
              }}>
              <Text style={styles.keybads}>1</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('4');
              }}>
              <Text style={styles.keybads}>4</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('7');
              }}>
              <Text style={styles.keybads}>7</Text>
            </Pressable>
            <Pressable style={styles.IconContainer}>
              <TouchIcon />
            </Pressable>
          </View>
          <View>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('2');
              }}>
              <Text style={styles.keybads}>2</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('5');
              }}>
              <Text style={styles.keybads}>5</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('8');
              }}>
              <Text style={styles.keybads}>8</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('0');
              }}>
              <Text style={styles.keybads}>0</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('3');
              }}>
              <Text style={styles.keybads}>3</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('6');
              }}>
              <Text style={styles.keybads}>6</Text>
            </Pressable>
            <Pressable
              style={styles.keybadContainerChild}
              onPress={() => {
                handleNumber('9');
              }}>
              <Text style={styles.keybads}>9</Text>
            </Pressable>
            <Pressable
              style={styles.IconContainer}
              onPress={() => setPin(pin.slice(0, -1))}>
              <RemoveIcon />
            </Pressable>
          </View>
        </View>
        <View style={styles.forgetPassword}>
          <TouchableOpacity>
            <Text style={styles.forgetText}>Forgot PIN Number?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginPinAuth;

const styles = StyleSheet.create({
  pinText: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.xxlg,
    fontWeight: '400',
    color: 'white',
    paddingRight: moderateScale(30),
  },
  instractionText: {
    paddingTop: moderateScale(10),
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    fontWeight: '500',
    color: 'white',
  },
  inputContainer: {
    marginTop: verticalScale(40),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputContainerChild: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },
  pinInputText: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    marginTop: verticalScale(10),
    fontFamily: Fontfamily.Avenier,
    backgroundColor: themeColors.cardsColor,
    fontSize: size.s,
    fontWeight: '500',
    color: 'white',
  },
  selectedInputText: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    marginTop: verticalScale(10),
    fontFamily: Fontfamily.Avenier,
    backgroundColor: themeColors.aquaColor,
    fontSize: size.s,
    fontWeight: '500',
    color: 'white',
  },
  keybadContainer: {
    marginTop: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'center',
    // flex:1
  },
  keybadContainerChild: {
    width: 72,
    height: 72,
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    backgroundColor: themeColors.cardsColor,
    marginBottom: verticalScale(20),
    marginHorizontal:
      Dimensions.get('window').width < 337
        ? moderateScale(17)
        : moderateScale(22),
  },
  IconContainer: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    paddingLeft: moderateScale(17),
    marginTop: verticalScale(-10),
    // marginBottom: moderateScale(20),
  },
  keybads: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.vxlg,
    fontWeight: '500',
    color: 'white',
  },
  forgetPassword: {
    marginTop: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetText: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.md,
    fontWeight: '400',
    color: themeColors.garyColor,
  },
});
