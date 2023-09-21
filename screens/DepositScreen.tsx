import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import {CrossIcon} from '../assets/svg';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {useNavigation} from '@react-navigation/native';
import {CopyIcon} from '../assets/svg/CopyIcon';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import CTTokenButton from '../common/CTTokenButton';
import {SCREENS} from '../typings/screens-enums';
import {NETWORK} from '../const/network';
import {
  selectAccountList,
  selectNapaWallet,
  selectNetworkType,
} from '../store/selectors/NapaAccount';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

const DepositScreen = () => {
  const {goBack, navigate}: any = useNavigation();
  const [copiedText, setCopiedText] = useState('');
  const account = useSelector(selectAccountList);
  const currentActive = useSelector(selectNapaWallet);
  const networkType = useSelector(selectNetworkType);
  const copyToClipboard = (copiedText: any) => {
    Clipboard.setString(copiedText);
  };

  useEffect(() => {
    const selectedAccount = account?.find(
      (val: any, index: number) =>
        val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
    );
    setCopiedText(selectedAccount[`NWA_${currentActive}_AC`]);
  }, [account]);
  return (
    <Layout>
      <Header
        leftChildren={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={goBack}>
              <CrossIcon color="grey" />
            </TouchableOpacity>
          </View>
        }
        title={false}
        centerTitle="Receive"
      />

      <View style={{height: moderateScale(20)}}></View>
      <CTTokenButton
        onPress={() => {
          navigate(SCREENS.SELECTNETWORK);
        }}
        title={networkType?.title}
        subTitle={networkType?.currencyName}
      />
      <View style={styles.qrContainer}>
        <ImageBackground
          source={require('../assets/images/linearGradient.png')}
          resizeMode="stretch"
          style={styles.imgStyle}>
          <View>
            <Text style={styles.tokenName1}>Wallet Address</Text>
            <View style={{alignItems: 'center'}}>
              {copiedText && (
                <QRCode
                  value={copiedText ? copiedText : ''}
                  size={250}
                  backgroundColor="#192020"
                  color={themeColors.aquaColor}
                />
              )}
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.lineContainer}></View>
            <View style={styles.footerContainer}>
              <View>
                <Text style={[styles.walletAddressa]}>{copiedText}</Text>
              </View>
              <TouchableOpacity
                onPress={() => copyToClipboard(copiedText)}
                style={styles.copyIcon}>
                <CopyIcon />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Layout>
  );
};

export default DepositScreen;
const styles = StyleSheet.create({
  tokenName1: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    color: themeColors.primaryColor,
    marginVertical: moderateScale(30),
    alignSelf: 'center',
  },
  walletAddressa: {
    textAlign: 'center',
    width: 220,
    height: 50,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    fontWeight: '500',
    color: themeColors.primaryColor,
    alignSelf: 'center',
  },
  copyIcon: {
    marginTop: verticalScale(22),
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    borderColor: themeColors.garyColor,
    alignSelf: 'center',
  },
  qrContainer: {
    flex: 1,
    marginTop: 10,
  },
  imgStyle: {
    width: width - moderateScale(16),
    flex: 1,
    alignSelf: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  lineContainer: {
    height: 1,
    backgroundColor: themeColors.garyColor,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
