import React from 'react';
import {useEffect, useState} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import TouchIdLogin from '../components/TouchIdLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {setIsLoggedIn} from '../store/slices/ProfileDetail';
import {useDispatch, useSelector} from 'react-redux';
import {
  Alert,
  Modal,
  Pressable,
  View,
  Text,
  StyleSheet,
  Linking,
  Platform,
  AppState,
  ImageBackground,
} from 'react-native';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import {selectProfileList} from '../store/selectors/profileDetailSelector';

const Touchidsetup = () => {
  const {navigate} = useNavigation<any>();
  const [isExist, setIsExist] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [biometricOption, setBioMetricOption] = useState('');
  const [termCondtions, setTermCondtions] = useState<boolean>(false);
  const rnBiometrics = new ReactNativeBiometrics();
  const isUserExit = useSelector(selectProfileList)?.emailAddress;

  const handleBiometricCheck = async () => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;

      if (available && biometryType === BiometryTypes.TouchID) {
        setBioMetricOption('TouchID');
        setIsExist(true);
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setBioMetricOption('FaceID');
        setIsExist(true);
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        setBioMetricOption('TouchID');
        setIsExist(true);
      } else {
        setBioMetricOption('PinNumber');
        setIsExist(false);
      }
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    handleBiometricCheck();
    const handleAppStateChange = (state: any) => {
      if (state === 'active') {
        handleBiometricCheck();
      }
    };
    AppState?.addEventListener('change', handleAppStateChange);
  }, []);

  const handleGeneratePublicKey = async () => {
    const emailAddress = await AsyncStorage.getItem('emailAddress');
    // setModalVisible(true);
    if (!isExist) {
      return setModalVisible(true);
    }
    rnBiometrics
      .simplePrompt({
        promptMessage: `${
          emailAddress ? 'Login' : 'Signup'
        } ${biometricOption}`,
      })
      .then(resultObject => {
        const {success} = resultObject;
        if (success === true) {
          rnBiometrics.createKeys().then(async resultObject => {
            const {publicKey} = resultObject;
            await AsyncStorage.setItem('publicKey', publicKey);
            dispatch(setIsLoggedIn(true));
            if (emailAddress) {
              navigate(SCREENS.SOCIALART);
            } else {
              navigate(SCREENS.CREATEPROFILE);
            }
          });
        }
      })
      .catch(e => {});
  };

  const handleModal = () => {
    if (isExist && !isUserExit) {
      handleGeneratePublicKey();
    } else {
      setModalVisible(true);
    }
  };

  const openMobileSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:root=TOUCHID_PASSCODE');
    } else {
      Linking.sendIntent('android.settings.SECURITY_SETTINGS');
    }
    setModalVisible(false);
  };

  // const fetchProfile = async () => {
  //   const emailAddress: any = await AsyncStorage.getItem('emailAddress');
  //   if (emailAddress) {
  //     dispatch(fetchProfileData(emailAddress));
  //   }
  // };
  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  return (
    <>
      {isUserExit ? (
        <ImageBackground
          style={{flex: 1}}
          resizeMode="cover"
          source={require('../assets/images/AuthBg.png')}>
          <TouchIdLogin
            title="Log in"
            handleBiometric={handleGeneratePublicKey}
            biometricType={biometricOption}
            button={false}
            option={biometricOption}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Set Up FingerPrint</Text>
                <Text style={styles.modalTextSmall}>
                  To use this feature, you'll need to set up your fingerprint on
                  your device first
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => openMobileSettings()}>
                    <Text style={styles.textStyle}>Setup</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      ) : (
        <ImageBackground
          style={{flex: 1}}
          resizeMode="cover"
          source={require('../assets/images/AuthBg.png')}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Set Up FingerPrint</Text>
                <Text style={styles.modalTextSmall}>
                  To use this feature, you'll need to set up your fingerprint on
                  your device first
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => openMobileSettings()}>
                    <Text style={styles.textStyle}>Setup</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <TouchIdLogin
            title="Signup"
            button={true}
            handleBiometric={handleModal}
            biometricType={biometricOption}
            option={biometricOption}
            setTermCondtions={setTermCondtions}
            termCondtions={termCondtions}
          />
        </ImageBackground>
      )}
    </>
  );
};
export default Touchidsetup;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 8,
    elevation: 2,
    marginRight: 20,
    width: 80,
    // backgroundColor: themeColors.garyColor,
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
    // backgroundColor: themeColors.garyColor,
  },
  buttonClose: {
    // backgroundColor: '#2196F3',
    backgroundColor: themeColors.aquaColor,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontFamily: Fontfamily.Neuropolitical,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: size.lg,
    fontFamily: Fontfamily.Neuropolitical,
  },
  modalTextSmall: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: size.s,
    fontFamily: Fontfamily.Neuropolitical,
  },
});
