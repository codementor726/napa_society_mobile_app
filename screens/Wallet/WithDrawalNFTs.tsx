import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {QRCodeIcon} from '../../assets/svg';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../../theme/colors';
import {size} from '../../theme/fontstyle';
import {Fontfamily} from '../../theme/fontFamily';
import {SCREENS} from '../../typings/screens-enums';
import {useDispatch, useSelector} from 'react-redux';
import {selectScannedWalletAddress} from '../../store/selectors/QrAuthorizeSelector';
import LoaderButton from '../../common/LoaderButton';
import CTButton from '../../common/CTButton';
import NftsAndSnftsDropDown from '../../common/NftsAndSnftsDropDown';
import {selectNfts} from '../../store/selectors/NftsAndSnftsSelector';
import {useToast} from 'react-native-toast-notifications';
import {sendNFT} from '../../services/AssetManagement';
import {selectProfileList} from '../../store/selectors/profileDetailSelector';
import {selectNetworkType} from '../../store/selectors/NapaAccount';
import {selectTransactionPublicKey} from '../../store/selectors/TokenList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {settransactionPublicKey} from '../../store/slices/TokenList';

const WithDrawalNFT = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation<any>();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const scanWalletAddress: any = useSelector(selectScannedWalletAddress);
  const [nfts, setNfts] = useState<any>();
  const nftsData = useSelector(selectNfts);
  const networkType = useSelector(selectNetworkType);
  const profileId = useSelector(selectProfileList)?.profileId;
  const registrationType = useSelector(selectProfileList)?.registrationType;
  const toast = useToast();
  const getTransactionPublickKey = useSelector(selectTransactionPublicKey);
  const [publicKey, setPublickey] = useState(false);
  const [formError, setFormError] = useState({
    address: '',
    NftError: '',
  });

  useEffect(() => {
    if (getTransactionPublickKey) {
      setPublickey(getTransactionPublickKey);
    }
  }, [getTransactionPublickKey]);

  useEffect(() => {
    if (scanWalletAddress) {
      setAddress(scanWalletAddress);
    }
  }, [scanWalletAddress]);

  const handleSendNFT = async () => {
    setLoading(true);
    setPublickey(false);
    dispatch(settransactionPublicKey(false));
    if (!address) {
      setFormError((prev: any) => {
        return {...prev, address: 'Send Address is Required'};
      });
      setLoading(false);
      return;
    }
    if (!nfts) {
      setFormError((prev: any) => {
        return {...prev, NftError: 'NFT is Required'};
      });
      setLoading(false);
      return;
    }
    if (!publicKey) {
      if (registrationType == 'Pin') {
        navigate(SCREENS.TRANSACTIONAUTH);
      }
      if (registrationType == 'Biometric') {
        navigate(SCREENS.AUTHENTICATEVERIFY);
      }
      setLoading(false);
      return;
    }
    // const {error, message} = await sendNFT(
    //   profileId,
    //   networkType.value,
    //   nfts?.tokenId,
    //   address,
    //   nfts?.contractAddress,
    // );
    // if (error) {
    //   toast.show(message, {type: 'danger'});
    //   setLoading(false);
    //   return;
    // }
    // setLoading(false);
    // navigate(SCREENS.WALLETSCREEN);
  };
  const handleNFT = async () => {
    setLoading(true);
    const {error, message} = await sendNFT(
      profileId,
      networkType?.value,
      nfts?.tokenId,
      address,
      nfts?.contractAddress,
    );
    if (error) {
      toast.show(message, {type: 'danger'});
      setLoading(false);
      setNfts(null);
      setAddress('');
      console.log('danger');
      setPublickey(false);
      dispatch(settransactionPublicKey(false));
      return;
    }
    setLoading(false);
    setNfts(null);
    setAddress('');
    setPublickey(false);
    dispatch(settransactionPublicKey(false));
    navigate(SCREENS.WALLETSCREEN);
  };
  useEffect(() => {
    if (publicKey) {
      handleNFT();
    }
  }, [publicKey, getTransactionPublickKey]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{height: moderateScale(20)}}></View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputMainContainer}
            placeholder="Enter address.."
            placeholderTextColor={themeColors.garyColor}
            onChangeText={setAddress}
            keyboardType="default"
            value={address}
          />
          <TouchableOpacity
            onPress={() => navigate(SCREENS.QRCODESCANNER, {wallet: 'true'})}
            style={styles.qrContainer}>
            <QRCodeIcon iconColor={themeColors.garyColor} />
          </TouchableOpacity>
        </View>
        {formError?.address && (
          <Text style={styles.errorMessage}>{formError?.address}</Text>
        )}
        <View style={styles.dropdownContainer}>
          <NftsAndSnftsDropDown
            title="Select NFT"
            data={nftsData}
            setSelected={setNfts}
            value={nfts}
          />
        </View>
        {formError.NftError && (
          <Text style={styles.errorMessage}>{formError.NftError}</Text>
        )}
        <View style={styles.selectNftTokenId}>
          <Text style={styles.tokenIdTitle}>NFT token ID</Text>
          <Text style={styles.tokenIdSubTitle}>{nfts?.tokenId}</Text>
        </View>
      </View>
      <View>
        {loading ? (
          <LoaderButton />
        ) : (
          <CTButton
            onPress={() => {
              handleSendNFT();
            }}
            title="Send"
          />
        )}
      </View>
    </View>
  );
};

export default WithDrawalNFT;

const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },
  inputContainer: {
    marginHorizontal: moderateScale(22),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: themeColors.garyColor,
    borderBottomWidth: 1,
  },
  inputMainContainer: {
    flex: 1,
    color: themeColors.primaryColor,
    fontSize: size.lg,
    fontFamily: Fontfamily.Avenier,
    paddingVertical:
      Platform.OS == 'ios' ? moderateScale(15) : moderateScale(10),
  },
  qrContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  amountContainer: {
    marginTop: moderateScale(30),
  },
  amountStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    color: themeColors.garyColor,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: moderateScale(8),
  },
  amountMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: moderateScale(22),
  },

  errorMessage: {
    marginTop: moderateScale(5),
    marginHorizontal: moderateScale(26),
    color: 'red',
    fontSize: size.default,
  },
  dropdownContainer: {
    justifyContent: 'center',
    marginHorizontal: 24,
    zIndex: 1,
    marginVertical: moderateScale(20),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  topInput: {
    color: themeColors.primaryColor,
  },
  fieldText: {
    marginTop: moderateScale(22),
    paddingLeft: Platform.OS == 'ios' ? moderateScale(17) : moderateScale(18),
    color: themeColors.garyColor,
    fontWeight: '400',
    fontSize: size.default,
  },
  dropdownArrowStyle: {},
  dropdownTitleStyle: {
    marginLeft: 10,
  },
  selectNftTokenId: {
    marginHorizontal: moderateScale(22),
    marginVertical: moderateScale(40),
  },
  tokenIdTitle: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.lg,
    color: themeColors.primaryColor,
    fontWeight: '400',
    lineHeight: 19.8,
  },
  tokenIdSubTitle: {
    marginTop: moderateScale(10),
    fontFamily: Fontfamily.Avenier,
    fontSize: size.md,
    color: themeColors.primaryColor,
    fontWeight: '500',
    lineHeight: 19.8,
  },
});
