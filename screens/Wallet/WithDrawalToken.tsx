import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {QRCodeIcon} from '../../assets/svg';
import {moderateScale} from 'react-native-size-matters';
import CTTokenButton from '../../common/CTTokenButton';
import {themeColors} from '../../theme/colors';
import {size} from '../../theme/fontstyle';
import {Fontfamily} from '../../theme/fontFamily';
import {fontSize} from '../../responsive';
import {SCREENS} from '../../typings/screens-enums';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectPublicKey,
  selectSelectedTokenList,
  selectTransactionPublicKey,
} from '../../store/selectors/TokenList';
import {numberWithCommas} from '../../utils/NumberWithCommas';
import HandleCurrencyIcon from '../../common/HandleCurrencyIcon';
const Token = require('../../connectivity/abis/anyToken.json');
import {ethers} from 'ethers';
import {selectProfileList} from '../../store/selectors/profileDetailSelector';
import {
  fetchGasFees,
  getSendCustomToken,
  getSendNativeToken,
} from '../../services/AssetManagement';
import {selectScannedWalletAddress} from '../../store/selectors/QrAuthorizeSelector';
import {selectNetworkType} from '../../store/selectors/NapaAccount';
import {useToast} from 'react-native-toast-notifications';
import LoaderButton from '../../common/LoaderButton';
import CTButton from '../../common/CTButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {settransactionPublicKey} from '../../store/slices/TokenList';

const WithDrawalToken = () => {
  const toast = useToast();
  const {goBack, navigate, route} = useNavigation<any>();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [gasFees, setGasFees] = useState('');
  const [loading, setLoading] = useState(false);
  const [gasFeesLoading, setGasFeesLoading] = useState(false);
  const token = useSelector(selectSelectedTokenList);
  const profileId = useSelector(selectProfileList).profileId;
  const registrationType = useSelector(selectProfileList)?.registrationType;
  const scanWalletAddress = useSelector(selectScannedWalletAddress);
  const networkType = useSelector(selectNetworkType);
  const getTransactionPublickKey = useSelector(selectTransactionPublicKey);
  const [publicKey, setPublickey] = useState<any>(false);
  const dispatch = useDispatch();
  const [formError, setFormError] = useState({
    amount: '',
    address: '',
  });
  useEffect(() => {
    if (getTransactionPublickKey) {
      setPublickey(getTransactionPublickKey);
    }
  }, [getTransactionPublickKey]);

  const handleGetGasFees = async () => {
    const numberOfTokens = ethers.utils.parseUnits(amount.toString(), 18);
    const params = {
      callData: {
        abi: JSON.stringify(Token),
        contractAddress: JSON.stringify(token?.tokenAddresses),
        functionName: JSON.stringify('transfer'),
        allParams: JSON.stringify([address, numberOfTokens]),
        chainId: networkType?.value,
        profileId: profileId,
      },
    };
    setGasFeesLoading(true);
    const {data, error, message}: any = await fetchGasFees(params);
    if (error) {
      console.log(message, 'gas fee Error');
      // toast.show(message, {type: 'danger'});
    }
    setGasFeesLoading(false);
    setGasFees(data?.data?.transactionSuccess?.GasFeesInEther?.toString());
  };

  const handleSendNativeToken = async () => {
    setLoading(true);
    const {data, error, message} = await getSendNativeToken(
      networkType?.value,
      profileId,
      address,
      amount,
    );
    if (error) {
      toast.show(message, {
        type: 'danger',
      });
      setLoading(false);
      setPublickey(false);
      return;
    }
    setAddress('');
    setAmount('');
    setLoading(false);
    setPublickey(false);
    dispatch(settransactionPublicKey(false));
    goBack();
  };

  const handleSendCustomToken = async () => {
    setLoading(true);
    const {data, error, message} = await getSendCustomToken(
      profileId,
      networkType?.value,
      token?.tokenAddresses,
      address,
      amount,
    );
    if (error) {
      toast.show(message, {
        type: 'danger',
      });
      setLoading(false);
      setPublickey(false);
      return;
    }
    setAddress('');
    setAmount('');
    setLoading(false);
    setPublickey(false);
    dispatch(settransactionPublicKey(false));
    goBack();
  };

  const handleSendToken = async () => {
    setFormError({
      amount: '',
      address: '',
    });
    if (!address) {
      setFormError((prev: any) => {
        return {
          ...prev,
          address: 'Send Address is Required',
        };
      });
    }
    if (!amount) {
      setFormError((prev: any) => {
        return {
          ...prev,
          amount: 'Send Amount is Required',
        };
      });
    }
    if (!amount || !address) {
      return;
    }
    if (Number(amount) > Number(token?.balance)) {
      toast.show('Not Enough Funds in Account for Transaction', {
        type: 'danger',
      });
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
  };
  useEffect(() => {
    if (publicKey) {
      if (token?.name && token?.name != 'ETH' && token?.name != 'SepoliaETH') {
        handleSendCustomToken();
      } else {
        handleSendNativeToken();
      }
    }
  }, [publicKey, getTransactionPublickKey]);

  useEffect(() => {
    if (!amount) {
      setGasFees('');
    }
    if (address && amount) {
      handleGetGasFees();
    }
  }, [address, amount]);

  useEffect(() => {
    if (scanWalletAddress) {
      setAddress(scanWalletAddress);
    }
  }, [scanWalletAddress]);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
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
        <View style={styles.amountContainer}>
          <Text style={styles.amountStyle}>Amount</Text>
          <View style={styles.amountMainContainer}>
            {/* <TextInput
              style={styles.valueStyle}
              value={amount}
              onChangeText={setAmount}
            /> */}

            <TextInput
              style={styles.valueStyle}
              placeholder="0.00"
              placeholderTextColor={themeColors.garyColor}
              onChangeText={setAmount}
              keyboardType="numeric"
              value={amount}
            />
            {/* <View style={styles.lineContainer}></View> */}
            <Text style={styles.typeStyle}>{token?.symbol}</Text>
          </View>
          {formError?.amount && (
            <Text style={styles.errorMessage}>{formError?.amount}</Text>
          )}
          <View style={styles.footerContainer}>
            <Text style={styles.footerTextStyle}>Total Available Balance:</Text>
            <View style={styles.imgStyle}>
              {
                <HandleCurrencyIcon
                  currencyName={token?.symbol}
                  bgColor=""
                  iconColor=""
                  width={25}
                  height={25}
                />
                /* <PayoutNapaIcon /> */
              }
            </View>
            <Text style={styles.balanceStyle}>
              {numberWithCommas(token?.balance || '0')}
            </Text>
          </View>
        </View>
        <View style={styles.line2Container}></View>
        <View style={{height: moderateScale(20)}} />
        <View style={styles.networkContainer}>
          <Text style={styles.neworkTextStyle}>Network Fee</Text>
          <View style={styles.rightContainer}>
            <View style={{paddingHorizontal: 6}}>
              {
                <HandleCurrencyIcon
                  currencyName={'ETH'} // this fee is always based on the network ETH for Ethereum, Matic for Polygon
                  bgColor=""
                  iconColor=""
                  width={25}
                  height={25}
                />
                // HandleCurrencyIcon(token?.symbol)
                // <PayoutNapaIcon />
              }
            </View>
            <Text style={[styles.depositStyle]}>
              {gasFeesLoading ? 'Calculating' : amount && gasFees ? gasFees : 0}
            </Text>
          </View>
        </View>

        <View style={styles.networkContainer}>
          <Text style={styles.neworkTextStyle}>Recipient Will Recieve</Text>
          <View style={styles.rightContainer}>
            <View style={{paddingHorizontal: 6}}>
              {
                <HandleCurrencyIcon
                  currencyName={token?.symbol}
                  bgColor=""
                  iconColor=""
                  width={25}
                  height={25}
                />
              }
            </View>
            <Text numberOfLines={1} style={[styles.depositStyle]}>
              {amount || '0'}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View>
        {loading ? (
          <LoaderButton />
        ) : (
          <CTButton
            onPress={() => {
              if (gasFeesLoading) {
                return;
              }
              handleSendToken();
            }}
            title="Send"
          />
        )}
      </View>
    </View>
  );
};

export default WithDrawalToken;

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
    marginBottom: moderateScale(10),
  },
  inputMainContainer: {
    flex: 1,
    color: themeColors.primaryColor,
    fontSize: size.lg,
    fontFamily: Fontfamily.Avenier,
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
    // height: fontSize(54),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: moderateScale(22),
    // backgroundColor: 'tan',
  },
  valueStyle: {
    // flex: 1,
    width: 150,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.extraxlg,
    color: themeColors.primaryColor,
    textAlign: 'right',
    padding: 0,
    lineHeight: fontSize(60),
  },
  typeStyle: {
    // flex: 1,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.md,
    color: themeColors.garyColor,
    alignSelf: 'flex-end',
    textAlignVertical: 'bottom',
    marginBottom: moderateScale(10),
    marginLeft: moderateScale(10),
  },
  lineContainer: {
    height: fontSize(60),
    width: 1.5,
    backgroundColor: themeColors.garyColor,
    borderRadius: 10,
    marginHorizontal: moderateScale(12),
  },
  line2Container: {
    height: 1,
    backgroundColor: themeColors.garyColor,
    borderRadius: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(30),
  },
  footerTextStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    color: themeColors.garyColor,
    paddingRight: moderateScale(2),
  },
  imgStyle: {
    marginHorizontal: moderateScale(8),
  },
  balanceStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    color: themeColors.primaryColor,
  },
  networkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(22),
    marginVertical: moderateScale(5),
  },
  neworkTextStyle: {
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    color: themeColors.primaryColor,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  depositStyle: {
    fontSize: size.default,
    fontFamily: Fontfamily.Avenier,
    color: themeColors.primaryColor,
  },
  errorMessage: {
    marginTop: moderateScale(-10),
    marginHorizontal: moderateScale(26),
    color: 'red',
    fontSize: size.default,
  },
});
