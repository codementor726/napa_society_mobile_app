'use strict';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  Platform,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import Layout from '../common/Layout';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {CrossIcon, QrCodeInnerIcon} from '../assets/svg';
import {SCREENS} from '../typings/screens-enums';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  setAuthorizeData,
  setScannedWalletAddress,
} from '../store/slices/QrAuthorize';
import {PERMISSIONS, request} from 'react-native-permissions';
const QrCodeScanner = ({route}: any) => {
  const {navigate} = useNavigation<any>();
  const {wallet} = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.CAMERA).then(result => {
        console.log(result, 'resultCamera');
        return result;
      });
    }
    const backAction = () => {
      navigate(SCREENS.HOME);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const onSuccess = (e: any) => {
    try {
      const data = JSON.parse(e?.data || '');
      if (data) {
        const authorizeObject = {
          ipAddress: data.ipAddress,
          location: data.location,
          device: data.device,
          generatedTimestamp: data.generatedTimestamp,
          id: data.id,
        };
        dispatch(setAuthorizeData(authorizeObject));
        navigate(SCREENS.QRAUTHORIZE);
      }
    } catch (error) {
      createTwoButtonAlert();
    }
  };
  const createTwoButtonAlert = () => {
    Alert.alert('Authorization Failed', 'Invalid Qr Code', [{text: 'OK'}]);
    navigate(SCREENS.HOME);
  };

  const handleGetWalletAddress = (e: any) => {
    const qrAddress = e?.data;
    if (
      !qrAddress.includes('walletAddress') &&
      !e?.data.startsWith('ethereum:')
    ) {
      dispatch(setScannedWalletAddress(qrAddress));
    } else if (e?.data.startsWith('ethereum:')) {
      dispatch(setScannedWalletAddress(e?.data.replace(/^ethereum:/i, '')));
    } else {
      dispatch(setScannedWalletAddress(JSON.parse(qrAddress)?.walletAddress));
    }
    navigate(SCREENS.WITHDRAWAL);
  };

  return (
    <>
      <Layout>
        <View style={styles.container}>
          <QRCodeScanner
            onRead={wallet == 'true' ? handleGetWalletAddress : onSuccess}
            showMarker={true}
            fadeIn={false}
            customMarker={<QrCodeInnerIcon />}
            cameraStyle={{width: '100%', height: '100%'}}
          />
          <TouchableOpacity
            style={{position: 'absolute', top: 40, left: 20}}
            onPress={() => {
              if (wallet == 'true') {
                navigate(SCREENS.WALLETSCREEN);
              } else {
                navigate(SCREENS.HOME);
              }
            }}>
            <CrossIcon color="white" width={30} height={30} />
          </TouchableOpacity>
        </View>
      </Layout>
    </>
  );
};

export default QrCodeScanner;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});
