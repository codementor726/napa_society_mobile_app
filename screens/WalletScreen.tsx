import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import {ImportIcon, Search, SettingsIcon, TimeIcon} from '../assets/svg';
import Layout from '../common/Layout';
import {Fontfamily} from '../theme/fontFamily';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {themeColors} from '../theme/colors';
import {size} from '../theme/fontstyle';
import Header from '../common/Header';
import NapaCount from '../common/NapaCount';
import TransactionCards from '../components/TransactionCards';
import AssetsToken from '../components/AssetsToken';
import AssetsNFT from '../components/AssetsNFT';
import {SCREENS} from '../typings/screens-enums';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectAccountList,
  selectNapaWallet,
  selectNetworkType,
} from '../store/selectors/NapaAccount';
import CustomDropdown from '../common/CustomDropdown';
import {fetchAllMixedTransactions} from '../services/TransactionApi';
import {
  addStreamAddress,
  getAllNFTsOfUser,
  getSpecificNFTsOfUser,
} from '../services/AssetManagement';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {setSelectedTokenList, setTokenList} from '../store/slices/TokenList';
import {numberWithCommas} from '../utils/NumberWithCommas';
import {
  selectSelectedTokenList,
  selectTokenList,
} from '../store/selectors/TokenList';
import axios from 'axios';
import {handleGetImportedTokens} from '../utils/helper';
import {ASSET_MANAGEMENT_WEBSOCKET_URL, WEBSOCKET_URL} from '../const/Url';
import {
  fetchAccountData,
  setActiveWallet,
  setactiveWalletAddress,
} from '../store/slices/NapaAccount';
import AssetsSNFT from '../components/AssetsSNFT';
import {setTransactionHistoryList} from '../store/slices/TransactionHistory';
import AssetsWatchlist from '../components/AssetsWatchlist';
import AssetsFavorites from '../components/AssetsFavorites';
import {setMintedPost} from '../store/slices/MintedSNFT';
import {NAPA_SNFT} from '../utils/addressHelper';
import {useIsFocused} from '@react-navigation/native';
import {setNftsPost, setSnftsPost} from '../store/slices/NftsAndSnfts';

const WalletScreen: FC = () => {
  const isFocused = useIsFocused();
  const navigation: any = useNavigation();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const account = useSelector(selectAccountList);
  const currentActive = useSelector(selectNapaWallet);
  const tokensList = useSelector(selectTokenList);
  const ProfileData = useSelector(selectProfileList);
  const token = useSelector(selectSelectedTokenList);
  const socketRef = useRef<any>(null);
  const profileId = useSelector(selectProfileList)?.profileId;
  const [selectedOption, setSelectedOption] = useState<any>();
  const assetManagementSocketRef = useRef<any>(null);
  const networkType = useSelector(selectNetworkType).value;
  const dispatch = useDispatch();
  const [nfts, setNfts] = useState<any[]>([
    {
      tokenId: '',
      shortContractAddress: '',
      contractAddress: '',
      id: '',
      name: '',
      description: '',
      attributes: '',
      image: '',
      onSold: '',
      avatar: '',
      amount: '',
      symbol: '',
    },
  ]);
  const [snfts, setSnfts] = useState<any[]>([
    {
      tokenId: '',
      shortContractAddress: '',
      contractAddress: '',
      id: '',
      name: '',
      description: '',
      attributes: '',
      image: '',
      onSold: '',
      avatar: '',
      amount: '',
      symbol: '',
      date: '',
    },
  ]);
  const [WatchList, setWatchList] = useState<any[]>([
    {
      tokenId: '',
      id: '',
      name: '',
      Volume: '',
      Change: '',
      image: '',
      FloorPrice: '',
      avatar: '',
      UniqueOwners: '',
      symbol: '',
      ItemsListed: '',
    },
  ]);

  const topTab = [
    {id: 1, name: 'Token'},
    {id: 2, name: "NFT's"},
    {id: 3, name: "SNFT's"},
    // {id: 4, name: 'Watchlist'},
    // {id: 5, name: 'Favorites'},
  ];
  useEffect(() => {
    if (account.length) {
      const selectedAccount = account?.find(
        (val: any, index: number) =>
          val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
      );

      setSelectedOption({
        name: selectedAccount[`NWA_${currentActive}_NE`],
        account: selectedAccount[`NWA_${currentActive}_AC`],
        key: selectedAccount[`NWA_${currentActive}_PK`],
        status: selectedAccount[`NWA_${currentActive}_ST`],
        createdAt: selectedAccount[`NWA_${currentActive}_CreatedAt`],
      });
    }
  }, [account, isFocused]);

  const connectToGeneralServices = () => {
    if (profileId && networkType && socketRef.current == null) {
      socketRef.current = new WebSocket(WEBSOCKET_URL);
      socketRef.current.addEventListener('message', async ({data}: any) => {
        const response = JSON.parse(data);
        if (response?.event === `new-napa-account-${profileId}`) {
          dispatch(fetchAccountData(profileId));
        }
        if (response.event === `switch-to-new-napa-account-${profileId}`) {
          dispatch(setMintedPost([]));
          const activeWalletAC = response?.account?.activeWalletAC;
          dispatch(setActiveWallet(activeWalletAC));
          dispatch(
            setactiveWalletAddress(
              response?.account[`NWA_${activeWalletAC}_AC`],
            ),
          );
          setSelectedOption({
            name: response?.account[`NWA_${activeWalletAC}_NE`],
            account: response?.account[`NWA_${activeWalletAC}_AC`],
            key: response?.account[`NWA_${activeWalletAC}_PK`],
            status: response?.account[`NWA_${activeWalletAC}_ST`],
            createdAt: response?.account[`NWA_${activeWalletAC}_CreatedAt`],
          });
          await addStreamAddress(response?.account[`NWA_${activeWalletAC}_AC`]);
        }
        if (response.event === `delete-napa-account-${profileId}`) {
          dispatch(fetchAccountData(profileId));
        }
        if (response?.event === 'new-imported-token') {
          handleGetImportedTokens(
            profileId,
            account,
            currentActive,
            networkType,
          )
            .then(tokenList => {
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
            .catch(error => console.log(error, 'error'));
        }
      });
    }
  };

  useEffect(() => {
    connectToGeneralServices();
    if (socketRef.current) {
      socketRef.current.onclose = (e: any) => {
        console.log(
          'General Services Socket is closed. Reconnet will be attempted in 1 second.',
          e.reason,
        );
        setTimeout(() => {
          if (socketRef.current) {
            connectToGeneralServices();
          }
        }, 1000);
      };
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [profileId, networkType]);

  useEffect(() => {
    console.log('Token check for balance 1');
    if (account && networkType) {
      console.log('Token check for balance 2');
      console.log(isFocused, 'isFocused');
      handleGetImportedTokens(
        ProfileData?.profileId,
        account,
        currentActive,
        networkType,
      )
        .then(tokenList => {
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
        .catch(error => console.log(error, 'error'));
    }
  }, [account, networkType]);

  const sortNfts = (nfts: any) => {
    //@ts-ignore
    nfts.sort((a, b) => {
      const num1 = +a.tokenId;
      const num2 = +b.tokenId;
      // if (num1 < num2) return -1;
      // if (num1 > num2) return 1;
      // return 0;
      return num1 - num2;
    });
    return nfts;
  };
  const loadNFTs: () => Promise<object[]> = async () => {
    const selectedAccount = account?.find(
      (val: any, index: number) =>
        val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
    );
    // let currentChainId
    // if (window.ethereum) {
    //   currentChainId = await window.ethereum.request({
    //     method: 'eth_chainId',
    //   })
    // }
    // const metaMaskNetwork = getChainId(currentChainId)
    setLoading(true);
    let dt: any = [];
    let newItems: any = [];
    try {
      const res = await getAllNFTsOfUser(
        networkType,
        selectedAccount[`NWA_${currentActive}_AC`],
      );
      // @ts-ignore
      await Promise.all(
        // @ts-ignore
        res?.data?.data?.tokenData?.response?.result.map(async (data: any) => {
          let splitted =
            data.token_address.slice(0, 6) +
            '...' +
            data.token_address.slice(38, data.token_address.length);
          // console.log(splitted, "datas")
          // let isOnSold = await checkIfApprovedToMarket(
          //   data.token_id,
          //   data.token_address
          // );
          // console.log(isOnSold, 'onsold');
          // let contractAddress = data.token_address;
          // if (contractAddress == '0x94d407d1860841e9a531d754ec5a6de7d899113d') {
          //   return null;
          // }
          if (
            NAPA_SNFT.toLowerCase().toString() !==
            data.token_address.toLowerCase().toString()
          ) {
            let ff = await data.token_uri;
            let meta: any = await axios.get(ff);
            let item = {
              tokenId: await data.token_id,
              shortContractAddress: splitted,
              contractAddress: data.token_address,
              id: await meta?.data?.id,
              name: await meta?.data?.name,
              description: await meta?.data?.description,
              attributes: await meta?.data?.attributes,
              image: await meta?.data?.image,
              avatar: data.media.original_media_url,
              amount: data?.amount,
              date: data.last_metadata_sync,
              title: await meta?.data?.title,
              // onSold: isOnSold,
            };
            newItems.push(item);
          }
        }),
      );
    } catch (e) {
      console.log(e);
    }

    setTimeout(() => {
      const sortedItems = sortNfts(newItems);
      setNfts(sortedItems);
      dispatch(setNftsPost(sortedItems));
      setLoading(false);
    }, 300);
    return dt;
  };

  const sortSNfts = (nfts: any) => {
    //@ts-ignore
    nfts.sort((a, b) => {
      const num1 = +a.tokenId;
      const num2 = +b.tokenId;
      // if (num1 < num2) return -1;
      // if (num1 > num2) return 1;
      // return 0;
      return num1 - num2;
    });
    return nfts;
  };
  const getSpecificNFTsOfUsers: () => Promise<object[]> = async () => {
    const selectedAccount = account?.find(
      (val: any, index: number) =>
        val[`NWA_${index + 1}_NE`] == val[`NWA_${currentActive}_NE`],
    );
    setLoading(true);
    let snftData: any = [];
    let newSnftItems: any = [];
    try {
      const res = await getSpecificNFTsOfUser(
        networkType,
        selectedAccount[`NWA_${currentActive}_AC`],
        NAPA_SNFT.toString(),
      );
      await Promise.all(
        // @ts-ignore
        res?.data?.data?.tokenData?.response?.result.map(async (data: any) => {
          let splitted =
            data.token_address.slice(0, 6) +
            '...' +
            data.token_address.slice(38, data.token_address.length);
          let ff = await data.token_uri;
          let meta: any = await axios.get(ff);
          let item = {
            tokenId: await data.token_id,
            shortContractAddress: splitted,
            contractAddress: data.token_address,
            id: await meta?.data?.id,
            name: await meta?.data?.name,
            description: await meta?.data?.description,
            attributes: await meta?.data?.attributes,
            image: await meta?.data?.image,
            avatar: data.media.original_media_url,
            amount: data?.amount,
            date: data?.last_metadata_sync,
            title: await meta?.data?.title,
          };
          newSnftItems.push(item);
        }),
      );
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      const sortedSnftsItems = sortSNfts(newSnftItems);
      setSnfts(sortedSnftsItems);
      dispatch(setSnftsPost(sortedSnftsItems));
      setLoading(false);
    }, 300);
    return snftData;
  };
  useEffect(() => {
    if (account && selectedOption && networkType && isFocused) {
      loadNFTs();
      getSpecificNFTsOfUsers();
    }
  }, [account, selectedOption, networkType, isFocused]);

  const handleGetTransactions = async () => {
    // const address = '0xa1D66BF3b8A08f40c5A61936Bb9C931201c97641';
    const transactionData = await fetchAllMixedTransactions(
      networkType,
      selectedOption?.account,
    );
    dispatch(
      setTransactionHistoryList(
        // @ts-ignore
        transactionData?.data?.data?.TransactionHistory,
      ),
    );
  };

  const connectToAssetManagement = () => {
    if (
      selectedOption &&
      networkType &&
      assetManagementSocketRef.current == null
    ) {
      // handleGetBalance();
      handleGetTransactions();
      assetManagementSocketRef.current = new WebSocket(
        ASSET_MANAGEMENT_WEBSOCKET_URL,
      );
      assetManagementSocketRef.current.addEventListener(
        'message',
        ({data}: any) => {
          const response = JSON.parse(data);
          // const firstEntry = Object.entries(selectedOption)[0];
          // // @ts-ignore
          // const firstValue: string = firstEntry[1];
          if (
            response?.event ===
            `streaming-erc20-transfers-to-account-${selectedOption?.account.toLowerCase()}`
          ) {
            handleGetImportedTokens(
              profileId,
              account,
              currentActive,
              networkType,
            )
              .then(tokenList => {
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
              .catch(error => console.log(error, 'error'));
            handleGetTransactions();
            // if (!toast) {
            //   //@ts-ignore
            //   toast.success(
            //     CustomToastWithLink({
            //       icon: DoneIcon,
            //       title: 'Success',
            //       description: 'Token Recieve',
            //       time: 'Now',
            //     }),
            //   );
            // }
          }
          if (
            response?.event ===
            `streaming-erc20-transfers-from-account-${selectedOption?.account.toLowerCase()}`
          ) {
            console.log('sending token from my account');
            handleGetImportedTokens(
              profileId,
              account,
              currentActive,
              networkType,
            )
              .then(tokenList => {
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
              .catch(error => console.log(error, 'error'));
            handleGetTransactions();
            // if (!toast) {
            //   //@ts-igno
            //   toast.success(
            //     CustomToastWithLink({
            //       icon: DoneIcon,
            //       title: 'Success',
            //       description: 'Token Send',
            //       time: 'Now',
            //     }),
            //   );
            // }
          }
        },
      );
    }
  };

  useEffect(() => {
    connectToAssetManagement();
    if (assetManagementSocketRef.current) {
      assetManagementSocketRef.current.onclose = (e: any) => {
        console.log(
          'Asset Managemet Socket is closed. Reconnect will be attempted in 1 second.',
          e.reason,
        );
        setTimeout(() => {
          if (assetManagementSocketRef.current) {
            connectToAssetManagement();
          }
        }, 1000);
      };
    }
    return () => {
      if (assetManagementSocketRef.current) {
        assetManagementSocketRef.current.close();
        assetManagementSocketRef.current = null;
      }
    };
  }, [networkType, selectedOption]);

  function renderHeader() {
    return (
      <Header
        title={false}
        leftChildren={
          <View style={styles.headerStyle}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(SCREENS.TRANSACTIONHISTORY);
              }}>
              <TimeIcon />
            </TouchableOpacity>
            <View />
          </View>
        }
        children={
          <Text style={styles.accountName}>{selectedOption?.name}</Text>
          // <CustomDropdown
          //   data={account ? account : null}
          //   selectedOption={selectedOption?.name}
          // />
        }
        rightChildren={
          <View style={styles.iconParent}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(SCREENS.WALLETSETTING);
              }}>
              <SettingsIcon />
            </TouchableOpacity>
          </View>
        }
        width={'80%'}
        rightChildrenWidth={'10%'}
        leftChildrenWidth={'10%'}
      />
    );
  }
  function renderTopTab() {
    return (
      <View style={styles.topTabContainer}>
        <FlatList
          horizontal
          data={topTab}
          keyExtractor={item => `${item.id}`}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setActiveTabIndex(index);
                setSearch('');
              }}>
              <Text
                style={[
                  styles.topTabText,
                  activeTabIndex === index ? styles.topTabActiveTab : null,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  const onImportPress = () => {
    navigation.navigate(SCREENS.IMPORTTOKEN, {
      type: activeTabIndex == 0 ? 'Token' : "NFT's",
    });
  };
  function renderSearch() {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color={themeColors.garyColor} />
          <TextInput
            placeholder="Search.."
            value={search}
            placeholderTextColor={themeColors.garyColor}
            onChangeText={e => setSearch(e)}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity
          style={styles.searchImportContainer}
          onPress={() => {
            onImportPress();
          }}>
          <ImportIcon />
          <Text style={styles.searchImportText}>Import</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Layout>
      <View style={styles.mainContainer}>
        {renderHeader()}
        <NapaCount
          count={numberWithCommas(token?.balance || '0', 2)}
          navigation={navigation}
          containerStyle={styles.countStyle}
          title={token?.symbol}
        />
        <TransactionCards />
        {renderTopTab()}
        <View style={{height: 3}} />
        {activeTabIndex !== 3 && activeTabIndex !== 4 && renderSearch()}

        <ScrollView>
          <View style={{flex: 1}}>
            {activeTabIndex == 0 && (
              <AssetsToken
                isFromWallet={true}
                containerStyle={styles.listContainer}
                search={search}
                tokenList={tokensList}
                loading={loading}
              />
            )}

            {activeTabIndex == 1 && (
              <AssetsNFT
                nfts={nfts}
                loading={loading}
                search={search}
                containerStyle={styles.listContainer}
              />
            )}
            {activeTabIndex == 2 && (
              <AssetsSNFT
                snfts={snfts}
                loading={loading}
                search={search}
                containerStyle={styles.listContainer}
              />
            )}
            {activeTabIndex == 3 && (
              <AssetsWatchlist
                WatchList={WatchList}
                containerStyle={styles.listContainer}
              />
            )}
            {activeTabIndex == 4 && (
              <AssetsFavorites
                WatchList={WatchList}
                containerStyle={styles.listContainer}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

export default WalletScreen;
const styles = StyleSheet.create({
  mainContainer: {
    // margin: 8,
    flex: 1,
  },
  headerContainer: {
    marginTop: 30,
    marginHorizontal: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    marginRight: 11,
    fontFamily: 'Avenir',
    fontSize: 16,
    lineHeight: 22.4,
  },
  headerIcon: {
    marginTop: 4.5,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: moderateScale(31),
    marginHorizontal: 17,
  },
  counterText: {
    color: themeColors.primaryColor,
    fontSize: size.xxxlg,
    fontFamily: Fontfamily.Grostestk,
    lineHeight: 52.8,
  },
  napaCounterTextSmall: {
    color: themeColors.garyColor,
    marginBottom: moderateScale(10),
    fontSize: size.md,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    lineHeight: 17.6,
    textTransform: 'uppercase',
  },
  countStyle: {
    marginTop: moderateScale(20),
    zIndex: 0,
  },
  transactionContainer: {
    marginVertical: moderateScale(27),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionContainerChild: {
    backgroundColor: '#192020',
    borderColor: '#192020',
    justifyContent: 'center',
    borderRadius: 24,
    width: '48%',
    height: verticalScale(97),
    padding: moderateScale(17),
  },
  transactionChildText: {
    color: themeColors.aquaColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    marginTop: moderateScale(12),
  },
  topTabContainer: {
    paddingHorizontal: moderateScale(22),
    marginTop: moderateScale(25),
  },

  amountContainer: {
    marginTop: 31,
    flexDirection: 'row',
  },
  topTabText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    marginRight: 20,
    paddingBottom: 11,
    fontWeight: '500',
    lineHeight: 19.6,
  },
  topTabActiveTab: {
    color: '#FFFFFF',
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
  },

  transactionChildTextWithdrawal: {
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
    marginTop: moderateScale(12),
    color: themeColors.lightred,
  },
  socialArtitems: {
    marginHorizontal: moderateScale(24),
    paddingBottom: moderateScale(5),
    marginTop: moderateScale(20),
  },
  searchContainer: {
    paddingHorizontal: moderateScale(22),
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchImportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchImportText: {
    marginLeft: 12,
    fontFamily: Fontfamily.Neuropolitical,
    fontWeight: '400',
    fontSize: size.default,
    lineHeight: 15.4,
    color: themeColors.aquaColor,
  },
  assetsListContainer: {
    marginTop: 21,
    paddingHorizontal: 16,
    paddingBottom: 98,
  },
  searchInput: {
    marginLeft: 16,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    lineHeight: 19.6,
    color: 'white',
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: verticalScale(60),
    height: verticalScale(30),
  },
  accountName: {
    color: themeColors.primaryColor,
    fontSize: size.xlg,
    fontWeight: '500',
    fontFamily: Fontfamily.Avenier,
    // width: '100%',
  },
  iconParent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: verticalScale(55),
  },
  listContainer: {
    marginTop: moderateScale(5),
    paddingTop: moderateScale(4),
  },
  textStyle: {
    fontFamily: Fontfamily.Avenier,
    color: themeColors.primaryColor,
  },
});
