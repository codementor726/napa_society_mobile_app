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
  ActivityIndicator,
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
import {useSelector} from 'react-redux';
import {selectProfileList} from '../../store/selectors/profileDetailSelector';
import {
  selectAccountList,
  selectNapaWallet,
  selectNetworkType,
} from '../../store/selectors/NapaAccount';
import {importNewToken} from '../../services/Token';
import LoaderButton from '../../common/LoaderButton';
import {getImportToken} from '../../services/AssetManagement';

const ImportTokenScreen = () => {
  const {goBack} = useNavigation();

  const {params}: any = useRoute();

  const [address, setAddress] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('');
  const [name, setName] = useState('');
  const [nftAddress, setNftAddress] = useState('');
  const [nftId, setNftId] = useState('');
  const [loading, setLoading] = useState(false);
  const networkType = useSelector(selectNetworkType).value;
  const refSymbol = useRef<any>();
  const refDecimal = useRef<any>();
  const refNftAddress = useRef();
  const refNftId = useRef<any>();
  const profileId = useSelector(selectProfileList).profileId;
  const account = useSelector(selectAccountList);
  const currentActive = useSelector(selectNapaWallet);

  const handleImportedTokens = async () => {
    const selectedAccount = account?.find(
      (val: any, index: number) =>
        val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
    );
    setLoading(true);
    const token = {
      profileId: profileId,
      napaWalletAccount: selectedAccount[`NWA_${currentActive}_AC`],
      networkId: networkType,
      decimals,
      symbol,
      name,
      tokenAddresses: address,
    };

    const {error, message}: any = await importNewToken(token);
    if (error) {
      setLoading(false);
      return;
    }
    setDecimals('');
    setSymbol('');
    setName('');
    setAddress('');
    setLoading(false);
    goBack();
  };
  const handleInputToken = async () => {
    setLoading(true);
    // let currentChainId
    // if (window.ethereum) {
    //   currentChainId = await window.ethereum.request({
    //     method: 'eth_chainId',
    //   })
    // }
    // const metaMaskNetwork = getChainId(currentChainId)
    // const privateKey = "9c4088cab3dabfaefea309edb62543cf4da9c7a47ed0f58f34db9c746da742ce";
    // const publicKey = "0xa1D66BF3b8A08f40c5A61936Bb9C931201c97641";
    // @ts-ignore
    const res: any = await getImportToken(networkType, address);
    setDecimals(res.data?.data?.tokenData?.response[0]?.decimals);
    setSymbol(res.data?.data?.tokenData?.response[0]?.symbol);
    setName(res.data?.data?.tokenData?.response[0]?.name);
    setLoading(false);
  };

  useEffect(() => {
    if (address.length == 42) {
      handleInputToken();
    }
  }, [address]);

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
          childStyle={styles.childStyle}
          centerStyle={styles.centerStyle}
          rightStyle={styles.childStyle}
          title={false}
          centerTitle={params.type == 'Token' ? 'Import Token' : 'Import NFT'}
        />

        <View style={{height: moderateScale(20)}}></View>
        {params.type == 'Token' ? (
          <>
            <CTTextinput
              title="Token Contract Address"
              value={address}
              onChangeText={setAddress}
              focus={true}
              onSubmitText={() => refSymbol.current.focus()}
            />
            <View style={{height: moderateScale(25)}}></View>
            <CTTextinput
              title="Token Symbol"
              value={symbol}
              onChangeText={setSymbol}
              inputRef={refSymbol}
              onSubmitText={() => refDecimal.current.focus()}
            />
            <View style={{height: moderateScale(25)}}></View>
            <CTTextinput
              title="Token Decimal"
              value={decimals}
              onChangeText={setDecimals}
              inputRef={refDecimal}
              onSubmitText={() => Keyboard.dismiss()}
            />
          </>
        ) : (
          <>
            <CTTextinput
              title="Address"
              value={nftAddress}
              onChangeText={setNftAddress}
              focus={true}
              inputRef={refNftAddress}
              onSubmitText={() => refNftId.current.focus()}
            />
            <View style={{height: moderateScale(25)}}></View>
            <CTTextinput
              title="Token ID"
              value={nftId}
              onChangeText={setNftId}
              inputRef={refNftId}
              onSubmitText={() => Keyboard.dismiss()}
            />
          </>
        )}
      </Layout>
      {loading ? (
        <LoaderButton />
      ) : (
        <CTButton
          onPress={() => {
            if (loading) {
              return;
            }
            handleImportedTokens();
          }}
          title="Import"
        />
      )}
    </>
  );
};

export default ImportTokenScreen;
const styles = StyleSheet.create({
  childStyle: {
    width: '20%',
  },
  centerStyle: {
    width: '55%',
  },
});
