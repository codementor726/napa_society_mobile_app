import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Layout from '../../common/Layout';
import Header from '../../common/Header';
import {BackIcon, CrossIcon, Search} from '../../assets/svg';
import {moderateScale} from 'react-native-size-matters';
import {size} from '../../theme/fontstyle';
import {themeColors} from '../../theme/colors';
import {Fontfamily} from '../../theme/fontFamily';
import CTTextinput from '../../common/CTTextinput';
import CTButton from '../../common/CTButton';
import GrayEyeIcon from '../../assets/svg/GrayEyeIcon';
import AlertIcon from '../../assets/svg/AlertIcon';
import {width} from '../../utils/helper';
import {BlurView} from '@react-native-community/blur';
import {PolicyIcon} from '../../assets/svg/PolicyIcon';
import {SCREENS} from '../../typings/screens-enums';
import {useDispatch, useSelector} from 'react-redux';
import {selectPublicKey} from '../../store/selectors/TokenList';
import {getRecoveryPhrase} from '../../services/napaAccounts';
import {selectProfileList} from '../../store/selectors/profileDetailSelector';
import {setPublicKey} from '../../store/slices/TokenList';

const RecoveryPhraseScreen = () => {
  const {goBack, navigate} = useNavigation();

  const refSymbol = useRef();
  const [isReveal, setIsReveal] = useState(false);
  const [paraphrase, setParaphrasel] = useState<any>();
  const publicKey = useSelector(selectPublicKey);
  const profileId = useSelector(selectProfileList).profileId;
  const dispatch = useDispatch();
  const onRevealPress = () => {
    //@ts-ignore
    navigate(SCREENS.AUTHENTICATEVERIFY, {
      text: 'true',
    });
  };

  const handleGetPhrase = async () => {
    const {data, error, message}: any = await getRecoveryPhrase(profileId);
    console.log('dadat', data);
    if (data) {
      setIsReveal(true);
      setParaphrasel(data?.data?.phrase);
      dispatch(setPublicKey(''));
    }
  };

  useEffect(() => {
    if (publicKey && profileId) {
      handleGetPhrase();
    }
  }, [publicKey, profileId]);
  return (
    <>
      <Layout>
        <Header
          leftChildren={
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={goBack}>
                <BackIcon color={'#677778'} />
              </TouchableOpacity>
            </View>
          }
          title={false}
        />
        <ScrollView>
          <Text style={styles.titleStyle}>Secret Recovery Phrase</Text>
          <Text style={styles.subTitleStyle}>
            The Secret Recovery Phrase (SRP) provides full access to your wallet
            and funds. Please keep it confidential.
          </Text>

          <View style={styles.alertContainer}>
            <AlertIcon />
            <Text style={styles.alertStyle}>
              Make sure no one is looking at your screen. NAPA Support will
              never request this phrase.
            </Text>
          </View>

          <Text style={styles.phraseStyle}>Your Phrase:</Text>

          <View style={styles.bottomContainer}>
            {paraphrase
              ? paraphrase?.split(' ')?.map((phrase: any, index: number) => {
                  return (
                    <View key={index} style={styles.container}>
                      <Text style={styles.listTextStyle}>{phrase}</Text>
                    </View>
                  );
                })
              : DATA.map((res: any) => {
                  return (
                    <View key={res.id} style={styles.container}>
                      <Text style={styles.listTextStyle}>{res.name}</Text>
                    </View>
                  );
                })}
            {isReveal ? null : (
              <>
                <BlurView
                  style={styles.absolute}
                  blurType="light"
                  blurAmount={10}
                  overlayColor="transparent"
                  reducedTransparencyFallbackColor="white"
                />
                <View style={styles.absolute}>
                  <PolicyIcon height={40} width={40} />
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </Layout>
      <>
        {isReveal ? (
          <>
            <CTButton
              title={'Paraphrase'}
              textStyle={styles.textStyle}
              containerStyle={{backgroundColor: themeColors.black}}
            />
            <CTButton title="Copy to Clipboard" />
          </>
        ) : (
          <CTButton
            onPress={onRevealPress}
            title="Reveal Secret Recovery Phrase"
          />
        )}
      </>
    </>
  );
};

export default RecoveryPhraseScreen;
const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },
  titleStyle: {
    fontSize: size.vxlg,
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    marginHorizontal: moderateScale(22),
    marginVertical: moderateScale(15),
  },
  subTitleStyle: {
    fontSize: size.default,
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    marginHorizontal: moderateScale(22),
  },
  alertContainer: {
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(8),
    backgroundColor: themeColors.alertBg,
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(14),
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertStyle: {
    flex: 1,
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
    color: themeColors.primaryColor,
    marginLeft: moderateScale(14),
  },
  phraseStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.lg,
    color: themeColors.primaryColor,
    marginHorizontal: moderateScale(22),
    marginVertical: moderateScale(30),
  },
  bottomContainer: {
    marginHorizontal: moderateScale(8),
    // backgroundColor: 'tan',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  container: {
    width: (width - moderateScale(32)) / 3,
    borderRadius: 100,
    backgroundColor: themeColors.darkGray,
    paddingVertical: 10,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTextStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.lg,
    color: themeColors.primaryColor,
    textAlign: 'center',
  },
  blurContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
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
  textStyle: {
    color: themeColors.primaryColor,
  },
});

const DATA = [
  {
    id: 1,
    name: 'basket',
  },
  {
    id: 2,
    name: 'wool',
  },
  {
    id: 3,
    name: 'bunker',
  },
  {
    id: 4,
    name: 'mystery',
  },
  {
    id: 5,
    name: 'amused',
  },
  {
    id: 6,
    name: 'hire',
  },
  {
    id: 7,
    name: 'region',
  },
  {
    id: 8,
    name: 'deputy',
  },
  {
    id: 9,
    name: 'truck',
  },
  {
    id: 10,
    name: 'famous',
  },
  {
    id: 11,
    name: 'airport',
  },
  {
    id: 12,
    name: 'trust',
  },
];
