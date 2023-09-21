import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {verticalScale} from 'react-native-size-matters';
import {TouchidIcon} from '../assets/svg/TouchidIcon';
import {FaceidIcon} from '../assets/svg/FaceidIcon';
import {SCREENS} from '../typings/screens-enums';
import PinAuth from '../screens/PinAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPinAuth from '../screens/LoginPinAuth';
import Checkbox from '../common/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { setTermAndConditions } from '../store/slices/CreateUserProfile';
import { selectGetTermCondition } from '../store/selectors/CreateProfileSelector';

type TouchIdLoginTypes = {
  title?: string;
  biometricType?: string;
  handleBiometric?: any;
  button?: boolean;
  option?: string;
  setTermCondtions?: any;
  termCondtions?: boolean;
};

const TouchIdLogin: React.FC<TouchIdLoginTypes> = ({
  handleBiometric,
  title,
  biometricType,
  button,
  option,
  setTermCondtions,
  termCondtions,
}) => {
  const {navigate} = useNavigation<any>();
  const [registrationType, setRegistrationType] = useState<any>('');
  const [emailAddressCheck, setEmailAddressCheck] = useState<boolean>(false)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const getPin = async () => {
    const registrationType = await AsyncStorage.getItem('registrationType');
    setRegistrationType(registrationType);
  };
  const getemailAddress = async () => {
    const emailAddress = await AsyncStorage.getItem('emailAddress');
    setEmailAddressCheck(emailAddress ? true : false)
  };

  useEffect(() => {
    getPin();
    getemailAddress()
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  return (
    <>
      {!loading &&
        ( registrationType !== 'Pin' ? (
          <View style={styles.touchidCointanier}>
            {button ? (
                  <TouchableOpacity onPress={()=>handleBiometric()} >
                {option === 'FaceID' ? <FaceidIcon /> : <TouchidIcon />}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                // style={styles.touch}
                onPress={() =>{if (biometricType !== 'PinNumber') {
                  handleBiometric();
                } else {
                  navigate(SCREENS.LOGINPINAUTH);
                }
              }}>
                {option === 'FaceID' ? <FaceidIcon /> : <TouchidIcon />}
              </TouchableOpacity>
            )}
            <Text style={styles.pageHeadingText}>
              {title} with {biometricType}
            </Text>
            <Text style={styles.pageMessageText}>
              Please place your finger on your phone to{' '}
              {title?.toLocaleLowerCase()}
            </Text>
          </View>
        ) : registrationType === 'Pin' ? (
          <LoginPinAuth />
        ) : (
          <PinAuth />
        ))}
      {button && biometricType && !emailAddressCheck && (
        <View style={styles.buyButton}>
          {title === 'Signup' && (
            <Pressable
              onPress={() =>{ setTermCondtions(!termCondtions)
                dispatch(setTermAndConditions( termCondtions ? 'false' : 'true'))
              }
              }
              style={{
                alignItems: 'center',
                marginBottom:
                  biometricType == 'PinNumber' ? verticalScale(20) : 0,
              }}>
              <Checkbox
                title="I Accept the Terms and Conditions"
                isChecked={termCondtions}
              />
            </Pressable>
          )}
          
          {
          title === 'Signup' ? (
            biometricType !== 'PinNumber' && (
              <TouchableOpacity
                disabled={termCondtions ? false : true}
                style={styles.pinSetup}
                onPress={() => navigate(SCREENS.PINAUTH)}>
                <Text style={styles.pinSetupText}>
                  Or Signup With a 6-digit Pin Number
                </Text>
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity
              style={styles.pinSetup}
              onPress={() => handleBiometric()}>
              <Text style={styles.pinSetupText}>
                {title} with a 6-digit PIN Number
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            disabled={termCondtions ? false : true}
            style={styles.buy}
            onPress={() => {
              if (biometricType !== 'PinNumber') {
                handleBiometric();
              } else {
                navigate(SCREENS.PINAUTH);
              }
            }}>
            <Text style={styles.buyText}>
              {title} with {biometricType}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default TouchIdLogin;
const styles = StyleSheet.create({
  touchidCointanier: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  touch: {
    shadowColor: 'aqua',
    shadowOffset: {height: 2, width: 2},
    shadowOpacity: 0.5,
    elevation: 5,
    borderRadius: 10,
    padding: 20,
  },
  pageHeadingText: {
    color: themeColors.primaryColor,
    fontSize: size.lg,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    paddingTop: verticalScale(26),
  },
  pageMessageText: {
    color: themeColors.primaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Avenier,
    paddingTop: verticalScale(12),
  },
  buyButton: {
    marginTop: 40,
    justifyContent: 'flex-end',
    // backgroundColor: themeColors.cardsColor,
    zIndex: 999,
  },
  buy: {
    backgroundColor: themeColors.aquaColor,
    paddingVertical: verticalScale(22),
    zIndex: 2,
  },
  pinSetup: {
    // backgroundColor: 'trans',
    paddingVertical: verticalScale(22),
    zIndex: 2,
  },
  buyText: {
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
  pinSetupText: {
    textAlign: 'center',
    color: themeColors.aquaColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
});
