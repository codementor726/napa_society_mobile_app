import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../common/Layout';
import {FaceidIcon} from '../assets/svg/FaceidIcon';
import {TouchidIcon} from '../assets/svg/TouchidIcon';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {moderateScale} from 'react-native-size-matters';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setPublicKey, settransactionPublicKey} from '../store/slices/TokenList';

const AuthenticateVerify = () => {
  const rnBiometrics = new ReactNativeBiometrics();
  const [isExist, setIsExist] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [biometricOption, setBioMetricOption] = useState('');
  const {goBack} = useNavigation();
  const route = useRoute<any>();
  const dispatch = useDispatch();

  const handleBiometricCheck = async () => {
    rnBiometrics.isSensorAvailable().then((resultObject: any) => {
      const {available, biometryType} = resultObject;

      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID');
        setBioMetricOption('TouchID');
        setIsExist(true);
      } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID');
        setBioMetricOption('FaceID');
        setIsExist(true);
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('TouchID');
        setBioMetricOption('TouchID');
        setIsExist(true);
      } else {
        setIsExist(false);
      }
    });
  };

  useEffect(() => {
    handleBiometricCheck();
  }, []);

  const handleGeneratePublicKey = async () => {
    if (!isExist) {
      return setModalVisible(true);
    }
    rnBiometrics
      .simplePrompt({
        promptMessage: `${'Authenticate'} ${biometricOption}`,
      })
      .then(resultObject => {
        const {success} = resultObject;
        if (success === true) {
          rnBiometrics.createKeys().then(async resultObject => {
            const {publicKey} = resultObject;
            dispatch(setPublicKey(publicKey));
            dispatch(settransactionPublicKey(true));
            goBack();
          });
        }
      })
      .catch(e => {
        console.log(e, 'error');
      });
  };

  return (
    <Layout>
      <View style={style.container}>
        <TouchableOpacity onPress={() => handleGeneratePublicKey()}>
          {biometricOption == 'FaceID' ? <FaceidIcon /> : <TouchidIcon />}
        </TouchableOpacity>
        <View>
          <Text style={style.text}>
            {route?.params?.text ? '' : 'Authenticate to Complete Transaction'}
          </Text>
        </View>
      </View>
    </Layout>
  );
};

export default AuthenticateVerify;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: moderateScale(20),
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.lg,
    textAlign: 'center',
    lineHeight: 21.6,
  },
});
