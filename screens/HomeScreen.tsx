import React, {useEffect, useState} from 'react';
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {NotificationIcon, QRCodeIcon} from '../assets/svg';
import Header from '../common/Header';
import AssetsSlider from '../components/AssetsCards';
import {size} from '../theme/fontstyle';
import {Fontfamily} from '../theme/fontFamily';
import TransactionCards from '../components/TransactionCards';
import EventCards from '../components/EventCards';
import {themeColors} from '../theme/colors';
import WhatTrendingcards from '../components/WhatTrendingCards';
import Layout from '../common/Layout';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../typings/screens-enums';
import {useDispatch, useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import ChatIcon from '../assets/svg/ChatIcon';
import NapaCount from '../common/NapaCount';
import {
  selectAccountList,
  selectActiveWalletAddress,
  selectNapaWallet,
  selectNetworkType,
} from '../store/selectors/NapaAccount';
import {
  selectSelectedTokenList,
  selectTokenList,
  selectTokenListLoading,
} from '../store/selectors/TokenList';
import {handleGetImportedTokens} from '../utils/helper';
import {setSelectedTokenList, setTokenList} from '../store/slices/TokenList';
import {numberWithCommas} from '../utils/NumberWithCommas';
import Bubbleloader from '../common/Bubbleloader';
import {fetchGetRecentEvents} from '../store/slices/Events';
import {getMySnftsSale} from '../services/MarketPlace';

const HomeScreen: React.FC = () => {
  const {navigate} = useNavigation<any>();
  const dispatch = useDispatch();
  const ProfileData = useSelector(selectProfileList);
  const account = useSelector(selectAccountList);
  const currentActive = useSelector(selectNapaWallet);
  const tokenbalance = useSelector(selectSelectedTokenList);
  const tokenbalanceLoading = useSelector(selectTokenListLoading);
  const networkType = useSelector(selectNetworkType)?.value;
  const walletAddress = useSelector(selectActiveWalletAddress);
  const [snftData, setSnftData] = React.useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleGetTokens = () => {
    if (account && selectTokenList.length == 0) {
      handleGetImportedTokens(
        ProfileData?.profileId,
        account,
        currentActive,
        networkType,
      )
        .then((tokenList: any) => {
          const napaToken = tokenList.find(
            (token: any) => token.symbol == 'NAPA',
          );
          if (napaToken) {
            dispatch(setSelectedTokenList(napaToken));
          } else {
            dispatch(setSelectedTokenList(tokenList[0]));
          }
          dispatch(setTokenList(tokenList));
        })
        .catch((error: any) => console.log(error, 'error'));
    }
  };

  useEffect(() => {
    handleGetTokens();
  }, [account, selectTokenList]);

  useEffect(() => {
    dispatch(fetchGetRecentEvents());
  }, []);

  const handleGetMySNFT = async () => {
    setLoading(true);
    const {data, error} = await getMySnftsSale(walletAddress);
    if (error) {
      setLoading(false);
      return;
    }
    setSnftData(data?.data);
    setLoading(false);
  };
  useEffect(() => {
    handleGetMySNFT();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(setSelectedTokenList({}));
    dispatch(setTokenList(4.29650254));
    setTimeout(() => {
      handleGetTokens();
      handleGetMySNFT();
      dispatch(fetchGetRecentEvents());
      setRefreshing(false);
    }, 700);
  }, []);

  return (
    <Layout>
      <Header
        title={true}
        leftChildren={
          <View style={styles.headerStyle}>
            <TouchableOpacity
              onPress={() => {
                navigate(SCREENS.PROFILE, {profileId: ProfileData?.profileId});
              }}>
              <Image
                style={styles.profileImage}
                source={{
                  uri:
                    ProfileData?.avatar ||
                    'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigate(SCREENS.QRCODESCANNER, {wallet: 'false'})
              }>
              <QRCodeIcon />
            </TouchableOpacity>
            <View />
          </View>
        }
        rightChildren={
          <View style={styles.iconParent}>
            <TouchableOpacity disabled={true} style={styles.searchIcon}>
              <NotificationIcon color={themeColors.garyColor} />
            </TouchableOpacity>
            <TouchableOpacity
              // disabled={true}
              style={styles.chatIconStyle}
              onPress={() => navigate(SCREENS.CHATLISTSCREEN)}>
              <ChatIcon color={themeColors.garyColor} />
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            progressBackgroundColor="transparent"
            colors={['white']}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {!tokenbalanceLoading ? (
          <NapaCount
            count={numberWithCommas(tokenbalance?.balance, 2)}
            isDisable={true}
            title={tokenbalance?.symbol}
          />
        ) : (
          <View
            style={{marginLeft: moderateScale(20), alignItems: 'flex-start'}}>
            <Bubbleloader />
          </View>
        )}

        <TransactionCards />
        <AssetsSlider loading={loading} snftData={snftData} />
        <WhatTrendingcards />
        {/* ..... my minted post ..... */}
        {/* <SocialCards /> */}
        <EventCards />
        {/* <PayoutCards /> */}
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: themeColors.secondaryColor,
    paddingVertical: moderateScale(10),
  },

  profileImage: {
    height: verticalScale(30),
    width: verticalScale(30),
    borderRadius: 50,
  },
  iconParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: verticalScale(55),
  },
  searchIcon: {
    // marginRight: moderateScale(8),
  },
  scrollView: {
    marginTop: moderateScale(20),
  },
  counter: {
    paddingHorizontal: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: moderateScale(20),
  },
  napaText: {
    fontWeight: '500',
    color: themeColors.primaryColor,
    fontSize: size.extraxlg,
    fontFamily: Fontfamily.Grostestk,
  },
  napaTextSmall: {
    color: themeColors.garyColor,
    marginLeft: moderateScale(20),
    marginBottom: moderateScale(10),
    fontSize: size.md,
    // fontWeight: '700',
    fontFamily: Fontfamily.Neuropolitical,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: verticalScale(72),
    // backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  chatIconStyle: {
    marginTop: 1,
  },
});
