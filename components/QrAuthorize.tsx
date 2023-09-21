import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../common/Layout';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {size} from '../theme/fontstyle';
import {useSelector} from 'react-redux';
import {selectAuthorizeData} from '../store/selectors/QrAuthorizeSelector';
import {themeColors} from '../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {BackIcon} from '../assets/svg';
import {qrCodeAuthorize} from '../services/AuthApi';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {Fontfamily} from '../theme/fontFamily';
import CTButton from '../common/CTButton';

const QrAuthorize = () => {
  const {navigate} = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const authorizeData = useSelector(selectAuthorizeData);
  const profileId = useSelector(selectProfileList)?.profileId;

  useEffect(() => {
    const backAction = () => {
      navigate(SCREENS.QRCODESCANNER);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const authorize = () => {
    const data = {
      generatedTimestamp: authorizeData.generatedTimestamp,
      id: authorizeData.id,
      profileId: profileId,
    };
    setLoading(true);
    if (data) {
      qrCodeAuthorize(data).then(() => {
        setLoading(false);
      });
      navigate(SCREENS.HOME);
    }
  };
  return (
    <Layout>
      <View style={styles.containerStyle}>
        <TouchableOpacity
          style={styles.headerContainer}
          onPress={() => navigate(SCREENS.QRCODESCANNER)}>
          {/* <BackIcon /> */}
          <BackIcon color={themeColors.garyColor} />
        </TouchableOpacity>
        <Text style={styles.titleStyle}>Confirm Login</Text>
        <Text style={styles.subtitleStyle}>
          Please confirm the information below {'\n'}to continue.
        </Text>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={styles.authorizeView}>
            <View style={styles.authorizeViewChild}>
              <Text style={styles.authorizeViewTextTitle}>IP Address :</Text>
              <Text style={styles.authorizeViewTextTitle}>Location :</Text>
              <Text style={styles.authorizeViewTextTitle}>Device :</Text>
            </View>
            <View style={styles.authorizeViewChild}>
              <Text style={styles.authorizeViewTitle}>
                {authorizeData.ipAddress}
              </Text>
              <Text style={styles.authorizeViewTitle}>
                {authorizeData.location}
              </Text>
              <Text style={styles.authorizeViewTitle}>
                {authorizeData.device}
              </Text>
            </View>
          </View>
          <View style={styles.footerContainer}>
            <CTButton
              title={'Cancel'}
              textStyle={styles.textStyle}
              containerStyle={{backgroundColor: themeColors.black}}
              onPress={() => navigate(SCREENS.HOME)}
            />
            <CTButton title={'Confirm'} onPress={() => authorize()} />
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default QrAuthorize;
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 30,
    marginHorizontal: 17,
  },
  authorizeView: {
    marginTop: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: themeColors.cardsColor,
    borderRadius: 22,
    marginHorizontal: 7,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  authorizeViewChild: {
    // marginBottom: moderateScale(10),
    height: verticalScale(80),
    justifyContent: 'space-between',
  },
  authorizeViewTextTitle: {
    color: themeColors.garyColor,
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
  },
  authorizeViewTitle: {
    color: themeColors.primaryColor,
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
  },
  authorizeViewTextsSubTitle: {
    color: 'white',
    fontSize: size.md,
  },
  buyLoader: {
    backgroundColor: themeColors.aquaColor,
    paddingVertical: moderateScale(11),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  titleStyle: {
    fontSize: size.vxlg,
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    marginVertical: moderateScale(20),
    marginHorizontal: 17,
  },
  subtitleStyle: {
    fontSize: size.default,
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    marginHorizontal: 17,
  },
  footerContainer: {
    // backgroundColor: 'red',
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
    color: themeColors.garyColor,
  },
});
