import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  ActivityIndicator,
  Animated,
  Modal,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {
  BackIcon,
  DoubleDotIcon,
  EthereumIcon,
  MuteIcon,
  PlayIcon,
  StarIcon,
  TetherIcon,
  TimeIcon,
  UnMuteIcon,
} from '../assets/svg';
import Header from '../common/Header';
import MarketPriceDetail from '../components/MarketPriceDetail';
import MarketPriceHistory from '../components/MarketPriceHistory';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {SCREENS} from '../typings/screens-enums';
import {
  deleteSnft,
  getSnft,
  pinToIPFS,
  updateSaleStatus,
} from '../services/MarketPlace';
import {useToast} from 'react-native-toast-notifications';
import {NapaTokenIcon} from '../assets/svg/NapaTokenIcon';
import {useDispatch, useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import Video from 'react-native-video';
import {
  MarketPlaceData,
  setMarketPlaceData,
} from '../store/slices/MarketPlaceItem';
import {
  selectAccountList,
  selectActiveWalletAddress,
  selectNapaWallet,
  selectNetworkType,
} from '../store/selectors/NapaAccount';
import {SnftResponse} from '../typings/marketPlace';
import {whichWalletConnected} from '../utils/handleWallet';
import {_fetchSingleMarketItem, buyNFTToken} from '../utils/marketPlace';
import axios from 'axios';
import {
  TallowanceAndBalance,
  nftData,
  transactionType,
} from '../typings/web3types';
import {
  _exists as SNFTExists,
  lazyMint as _newLazyMint,
  getFees as ethFees,
} from '../utils/snftCallHelper';
import BuyModal from '../common/BuyModal';
import {transactionModalType} from '../typings/TxModal';
import {NAPA_MARKETPLACE, NAPA_SNFT} from '../utils/addressHelper';
import {
  allowance as NAPAAllowance,
  balanceOf as NAPABalanceOf,
  approve as NPTApprove,
} from '../utils/napaTokenCallHelper';
import {
  allowance as USDTAllowance,
  balanceOf as USDTBalanceOf,
  approve as USDTApprove,
} from '../utils/usdtTokenCallHelper';
import {
  fetchAllMixedTransactions,
  fetchGasFees,
  getCustomTokenWalletBalance,
  getTokensMarketPrice,
} from '../services/AssetManagement';
import {createNewTransaction} from '../services/Transaction';
import {selectTokenList} from '../store/selectors/TokenList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ASSET_MANAGEMENT_WEBSOCKET_URL, SOCIAL_ART_API_URL} from '../const/Url';
import {selectMarketPlaceList} from '../store/selectors/MarketPlaceItemSelector';
import {setTransactionHistoryList} from '../store/slices/TransactionHistory';
import {handleGetImportedTokens, height} from '../utils/helper';
import {setSelectedTokenList, setTokenList} from '../store/slices/TokenList';
import Token from '../connectivity/abis/anyToken.json';
import {ethers} from 'ethers';
import ErrorToast from '../common/toasters/ErrorToast';
import WarningToast from '../common/toasters/WarningToast';
import SuccessToast from '../common/toasters/SuccessToast';
import PreviousEarning from './PreviousEarning';
import moment from 'moment';
import LiveTime from './LiveTimer';
import {getPostViewsRollings} from '../services/PostApi';
import {EarningDataI} from '../typings/post';
import {BlurView} from '@react-native-community/blur';
import {LightCrossIcon} from '../assets/svg/LightCrossIcon';

const MarketPlaceDetailSNFT = ({route}: any) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const socketRef = useRef<any>(null);
  const {snftId, marketId}: any = route?.params;
  const {navigate, goBack} = useNavigation<any>();
  const profileId = useSelector(selectProfileList)?.profileId;
  const profileDetails = useSelector(selectProfileList);
  const networkType = useSelector(selectNetworkType)?.value;
  const napaWalletAccount = useSelector(selectActiveWalletAddress);
  const videoRef = React.useRef<any>(null);
  const [detail, setDetail] = useState(true);
  const [history, setHistory] = useState(false);
  const [SNFTDetail, setSNFTDetail] = useState<any>([]);
  const [showPauseButton, setShowPauseButton] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [seller, setSeller] = useState('');
  const [open, setOpen] = useState(false);
  const [isMinted, setIsMinted] = useState<any>();
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [balance, setBalance] = useState<any>();
  const [loading, setLoading] = useState(false);
  const account = useSelector(selectAccountList);
  const currentActive = useSelector(selectNapaWallet);
  const assetManagementSocketRef = useRef<any>(null);
  const [isOpenPayNowButton, setIsOpenPayNowButton] = useState(false);
  const marketData = useSelector(selectMarketPlaceList);
  const tokenBalance = useSelector(selectTokenList);
  const [networkFee, setNetworkFee] = useState<any>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [seeModal, setSeeModal] = useState(false);
  const [marketItemPrice, setMarketItemPrice] = React.useState<number | string>(
    0,
  );
  const [duration, setDuration] = React.useState<any>();
  const [marketItemCurrencyType, setMarketItemCurrencyType] = React.useState<
    number | string
  >(-1);
  const [previousEarning, setPreviousEarning] = useState<boolean>(false);
  const [topScroll, setTopScroll] = useState<boolean>(false);
  const handleGetSNFt = async () => {
    const {data, error, message} = await getSnft(snftId);
    setSNFTDetail(data?.data);
    console.log(data?.data, 'datata');
    if (data?.data?.duration === '1 Day') {
      let durationt = data?.data?.duration?.replace(' Day', '');
      setDuration(Number(durationt));
    } else {
      let durationt = data?.data?.duration?.replace(' Days', '');
      setDuration(Number(durationt));
    }
  };

  const connectToSocialArt = () => {
    if (profileId && networkType && socketRef.current == null) {
      socketRef.current = new WebSocket(SOCIAL_ART_API_URL);
      socketRef.current.addEventListener('message', async ({data}: any) => {
        const response = JSON.parse(data);
        if (response?.event === `update-sale-status-${SNFTDetail?.snftId}`) {
          console.log(
            `update-sale-status-${SNFTDetail?.snftId}=====>>>>>>>>>>>`,
          );
          setSNFTDetail(response?.item);
        }
      });
    }
  };

  useEffect(() => {
    connectToSocialArt();
    if (socketRef.current) {
      socketRef.current.onclose = (e: any) => {
        console.log(
          'Social Art Services Socket is closed. Reconnet will be attempted in 1 second.',
          e.reason,
        );
        setTimeout(() => {
          if (socketRef.current) {
            connectToSocialArt();
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
  }, [SNFTDetail?.snftId]);

  const handleGetTransactions = async () => {
    // const address = '0xa1D66BF3b8A08f40c5A61936Bb9C931201c97641';
    const transactionData: any = await fetchAllMixedTransactions(
      networkType,
      napaWalletAccount,
    );
    dispatch(
      setTransactionHistoryList(
        transactionData?.data?.data?.TransactionHistory,
      ),
    );
  };

  const connectToAssetManagement = () => {
    if (
      napaWalletAccount &&
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
            `streaming-erc20-transfers-to-account-${napaWalletAccount?.toLowerCase()}`
          ) {
            console.log('receiving token from other account');
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
          }
          if (
            response?.event ===
            `streaming-erc20-transfers-from-account-${napaWalletAccount.toLowerCase()}`
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
  }, [networkType, napaWalletAccount]);

  const getEtherBalance = async () => {
    const chainId = await getNetwork();
    const response: any = await getCustomTokenWalletBalance(chainId, profileId);
    console.log(
      (response?.data?.data?.CustomTokenWalletBalance || 0) / 10 ** 18,
      'balancebalancebalancebalance',
    );
    setBalance(
      (response?.data?.data?.CustomTokenWalletBalance || 0) / 10 ** 18,
    );
  };
  useEffect(() => {
    getEtherBalance();
    if (snftId) {
      handleGetSNFt();
    }
  }, [snftId, profileId]);

  const dummydata: transactionModalType = {
    // Title: 'Buy',
    WalletID: napaWalletAccount,
    Description: `You are buying ${SNFTDetail.SNFTTitle}`,
    NetworkFees: networkFee,
    SpendAmount: '0.000000998723',
    TotalSpend: '0.00083799872',
    TransactionID: '0x66f1c1.....0800f4a0',
    TransactionType: 'Buy SNFT',
    Congratulations: `Congratulations on buying`,
    Message: `As owner of this SNFT you are now eligible to receive all the earnings based on the views as of the date of this purchase minus the creator fees!👏`,
    confirmTransaction(): Promise<void> {
      return marketPlaceInit();
    },
  };

  const getNetwork = async () => {
    let currentChainId;
    let metaMaskNetwork: any;
    // for Metamsk
    // if (window.ethereum) {
    //   currentChainId = await window.ethereum.request({
    //     method: 'eth_chainId',
    //   });
    //   metaMaskNetwork = await getChainIdForOtherWallet(
    //     currentChainId.toString(),
    //   );
    //   console.log(metaMaskNetwork, 'metaMaskNetwork');
    // }
    // for NAPA Wallet
    const walletNetwork: any = networkType;
    // console.log(
    //   metaMaskAccount
    //     ? metaMaskNetwork
    //     : Number(walletNetwork) === 1
    //     ? Number(walletNetwork) + 1
    //     : Number(walletNetwork),
    //   'Current Network',
    // );
    // return metaMaskAccount
    //   ? metaMaskNetwork
    //   : Number(walletNetwork) === 1
    //   ? Number(walletNetwork) + 1
    //   : Number(walletNetwork);
    return walletNetwork;
  };

  const getNFTData = async (
    _tknId: string | number,
    _contract: string,
  ): Promise<nftData> => {
    const url = `https://deep-index.moralis.io/api/v2/nft/${_contract}/${_tknId}?chain=sepolia&format=decimal&normalizeMetadata=true&media_items=false`;

    try {
      const res = await axios.get(url, {
        headers: {
          accept: 'application/json',
          'X-API-Key':
            'gxFx0RWobr82DUQZD7W2qwtsfaW63p6QtIJh7pZSvRshWexNbv58m9Dc1hai9ZLl',
        },
      });
      const allData = {
        image: res.data.normalized_metadata.image,
        contract_name: res.data.name,
        contract_symbol: res.data.symbol,
        description: res?.data?.normalized_metadata?.description,
      };
      return allData;
    } catch (e: any) {
      console.log(e, ' Error while fetching NFT Metadata');
      return e;
    }
  };

  const loadMarketItem = async (): Promise<any> => {
    let res: any;
    const chainId = await getNetwork();
    const {_id} = await whichWalletConnected(
      napaWalletAccount,
      profileId,
      chainId,
    );
    if (marketId > 0) {
      const marketData: any = await _fetchSingleMarketItem(
        // signer,
        _id,
        chainId,
        profileId,
        marketId,
      );
      console.log(
        marketData,
        'marketDatamarketDatamarketDatamarketDatamarketData',
      );
      if (marketData.price > 0) {
        setMarketItemPrice(marketData.price);
        setMarketItemCurrencyType(marketData.paymentMode);
      }
      if (marketData) {
        res = marketData;
      }
    }
    return res;
  };

  const convertToSNFT = async (): Promise<any> => {
    let data: any;
    try {
      const mrktData: any = await loadMarketItem();
      if (mrktData.price > 0) {
        let _ctr = mrktData?.nftContract;
        let _tknId = mrktData?.tokenId;
        const internalData: any = await getNFTData(_tknId, _ctr);
        // console.log(await internalData, "INNER MAP")
        // if (mrktData?.seller.length > 0) {
        console.log(mrktData, 'New Seller');
        setSeller(mrktData?.seller);
        // }
        if (true) {
          data = {
            itemId: mrktData.itemId,
            SNFTAddress: mrktData.nftContract,
            tokenId: mrktData.tokenId,
            owner: mrktData.owner,
            amount: mrktData.price,
            currencyType: mrktData.paymentMode,
            isCoBatchable: mrktData.isCobatchable,
            listed: mrktData.sold,
            SNFTDescription: await internalData.description,
            SNFTTitle: await internalData.contract_name,
            SNFTCollection: await internalData.contract_name,
            marketplace_listed: mrktData.sold,
            thumbnail: await internalData.image,
          };
        }
        console.log(data, 'converted object');
      } else {
        console.log('No NFT Found on web-3 MarketPlace');
      }
      return data;
    } catch (e: any) {
      console.log(
        'Error While Fetching MarketPlace NFTs from web3 MarketPlace',
        e,
      );
      return data;
    }
  };

  const setMarketData = async () => {
    let localItem: SnftResponse | undefined = {
      amount: '-1',
      createdAt: '',
      currencyType: '',
      duration: '',
      mintId: '',
      postId: '',
      profileId: '',
      snftId: '',
      type: '',
      updatedAt: '',
      accountId: '',
      generatorId: '',
      generatorName: '',
      genre: '',
      lazyMinted: '',
      listed: '',
      marketplace_listed: '',
      maxOffer: '',
      napaTokenEarned: '',
      payoutsCategory: '',
      SNFTAddress: '',
      SNFTCollection: '',
      SNFTDescription: '',
      SNFTTitle: '',
      thumbnail: '',
      tokenId: '',
      tokenUri: '',
      userImage: '',
      userName: '',
      videoURL: '',
      isWeb3Listed: false,
    };
    const newData = await convertToSNFT();
    console.log(newData, 'web3Object');
    localItem.snftId = newData?.itemId;
    localItem.currencyType = newData?.currencyType;
    localItem.amount = newData?.amount;
    localItem.mintId = newData?.tokenId;
    localItem.SNFTDescription = newData?.SNFTDescription;
    localItem.SNFTTitle = newData?.SNFTTitle;
    localItem.SNFTCollection = newData?.SNFTCollection;
    localItem.SNFTAddress = newData?.SNFTAddress;
    localItem.generatorName = newData?.seller;
    localItem.marketplace_listed = newData?.listed;
    localItem.thumbnail = newData?.thumbnail;
    localItem.tokenUri = newData?.SNFTDescription;
    localItem.tokenId = newData?.tokenId;
    localItem.listed = newData?.listed;
    localItem.lazyMinted = 'false';
    localItem.isWeb3Listed = true;
    return localItem;
  };

  const snftExists = async (_tokenId: any): Promise<boolean> => {
    let response: boolean = false;
    try {
      const chainId = await getNetwork();
      const {_id} = await whichWalletConnected(
        napaWalletAccount,
        profileId,
        chainId,
      );
      const allowance = await SNFTExists(
        // signer,
        _id,
        chainId,
        profileId,
        _tokenId.toString(),
      );
      response = allowance;
      console.log(`is ${_tokenId} NFT Exists? `, response);
      return response;
    } catch (e) {
      console.log('Error while giving the Approval', e);
      return response;
    }
  };

  const checkIfMarketItemOrNot = async () => {
    //for if item is from web3
    if (typeof marketId === 'string' && Number(marketId) > 0) {
      console.log('Weird Market Item', 121);
      const data = await setMarketData();
      console.log(SNFTDetail, marketId, data, 'data found for web3 MarketItem');
      setSNFTDetail(data);
      //for if item is from web2
    } else if (SNFTDetail && typeof marketId !== 'number') {
      console.log('Weird Market Item', 121);
      console.log(SNFTDetail, marketId, 'data found for web2 MarketItem');
      const _tkn: any = SNFTDetail?.tokenId;
      const isIt = await snftExists(_tkn.toString());
      if (isIt) {
        setIsMinted(isIt);
      }
      setSNFTDetail(SNFTDetail);
      const _price: number = Number(SNFTDetail.amount) * 10 ** 18;
      setMarketItemPrice(_price);
      setMarketItemCurrencyType(SNFTDetail.currencyType);
    } else {
      console.log('Weird Market Item', 121);

      console.log(SNFTDetail, marketId, '_snftDetails_snftDetails');
    }
  };

  useEffect(() => {
    console.log(
      SNFTDetail,
      marketId,
      '_snftDetails_snftDetails_snftDetails',
      open,
    );
    checkIfMarketItemOrNot();
    if (seller.length > 0) {
      if (napaWalletAccount.toString() === seller) {
        setIsSeller(true);
      }
    }
    console.log(transactionInProgress, 'is modal changed');
  }, [seller, openModal]);

  const checkApprovalAndBalance = async (
    _tokenType: string | number,
    _spender: string,
  ) => {
    let response: TallowanceAndBalance = {
      allowance: -1,
      balance: -1,
    };
    console.log(napaWalletAccount, 'WALLET DETAILS');
    const chainId = await getNetwork();
    const {_id} = await whichWalletConnected(
      napaWalletAccount,
      profileId,
      chainId,
    );
    try {
      if (_tokenType == 0) {
        const allowance = await NAPAAllowance(
          // signer,
          _id,
          chainId,
          profileId,
          napaWalletAccount,
          _spender.toString(),
        );
        const balance = await NAPABalanceOf(
          // signer,
          _id,
          chainId,
          profileId,
          napaWalletAccount.toString(),
        );
        response.allowance = parseInt((await allowance).toString(), 10);
        response.balance = balance.toString();
        console.log(response, 'allowance and balance for NAPA TKN');
      } else if (_tokenType == 1) {
        const chainId = await getNetwork();
        const allowance = await USDTAllowance(
          // signer,
          _id,
          chainId,
          profileId,
          napaWalletAccount,
          _spender.toString(),
        );
        const balance = await USDTBalanceOf(
          // signer,
          _id,
          chainId,
          profileId,
          napaWalletAccount.toString(),
        );
        response.allowance = parseInt((await allowance).toString(), 16);
        response.balance = balance.toString();
        console.log(response, 'allowance and balance for USDT TKN');
      } else if (_tokenType == 2) {
        response.allowance = 0;
        response.balance = balance;
        console.log(response, 'allowance and balance for ETHERS');
      } else {
        console.log('Wrong Token Type');
        await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
      }
      return {response};
    } catch (e) {
      console.log('Error while getting the Allowance and Balance', e);
      // toast.show('Error while getting the Allowance and Balance', {
      //   type: 'danger',
      // });
      // await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
      return response;
    }
  };

  const checkFunds = async (
    _currencyType: string | number,
    _spender: string,
    desiredAmouont: string | number,
  ): Promise<boolean> => {
    let res: boolean = false;
    if (Number(_currencyType) === 0) {
      const _res: any = await checkApprovalAndBalance(
        _currencyType,
        NAPA_MARKETPLACE,
      );
      if (desiredAmouont <= _res.response.balance) {
        if (desiredAmouont <= _res.response.allowance) {
          res = true;
        } else {
          console.log('Insufficient Balance or Allowance');
          // toast.show('Insufficient Balance or Allowance', {type: 'danger'});
          // await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
        }
      } else {
        console.log("You don't have sufficient NAPA Balance to buy this Item");
        // toast.show('Insufficient Balance or Allowance', {type: 'danger'});
        // await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
      }
      return res;
    } else if (Number(_currencyType) === 1) {
      const _res: any = await checkApprovalAndBalance(
        _currencyType,
        NAPA_MARKETPLACE,
      );
      if (desiredAmouont <= _res.response.balance) {
        if (desiredAmouont <= _res.response.allowance) {
          res = true;
        } else {
          console.log('Insufficient Balance or Allowance');
          // await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
        }
      } else {
        console.log("You don't have sufficient USDT Balance to buy this Item");
        await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
      }
      return res;
    } else if (Number(_currencyType) === 2) {
      const _res: any = await checkApprovalAndBalance(
        _currencyType,
        NAPA_MARKETPLACE,
      );
      if (desiredAmouont <= _res.response.balance) {
        res = true;
      } else {
        console.log('Insufficient Eth Balance');
        await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
      }
      return res;
    } else {
      console.log('Invalid Payment Type');
      await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
    }
    return res;
  };

  const approveAny = async (
    _amount: string,
    _tokenType: string | number,
    _to: string,
  ): Promise<transactionType> => {
    let response: transactionType = {response: -1, transactionHash: -1};
    try {
      const chainId = await getNetwork();
      const {_id} = await whichWalletConnected(
        napaWalletAccount,
        profileId,
        chainId,
      );
      if (_tokenType == '0') {
        const ApproveResponse: transactionType = await NPTApprove(
          // signer,
          _id,
          chainId,
          profileId,
          _to,
          _amount,
        );
        console.log(
          ApproveResponse.response,
          ApproveResponse.transactionHash,
          'ApproveResponse for NAPA TKN',
        );
        response = ApproveResponse;
      } else if (_tokenType == '1') {
        const ApproveResponse: transactionType = await USDTApprove(
          // signer,
          _id,
          chainId,
          profileId,
          _to,
          _amount,
        );
        console.log(ApproveResponse, 'ApproveResponse for USDT TKN');
        response = ApproveResponse;
      } else if (_tokenType == '2') {
        console.log('for ETHERS do nothing');
      } else {
        console.log('wrong Token Type');
      }
      return response;
    } catch (e) {
      console.log('Error while giving the Approval', e);
      await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
      return response;
    }
  };

  const generateIPFS = async () => {
    setLoading(true);
    console.log('generating IPFS ... ');
    console.log(SNFTDetail, 'SNFTDetail');

    const data = {
      thumbnail: SNFTDetail?.thumbnail,
      videoURL: SNFTDetail?.videoURL,
      id: SNFTDetail?.snftId,
      userName: profileDetails?.profileName,
      avatar: profileDetails?.avatar,
      description: SNFTDetail?.SNFTDescription,
      title: SNFTDetail?.SNFTTitle,
    };

    // const data = {
    //   thumbnail: "https://gateway.pinata.cloud/ipfs/QmZqqLdyuQPvG9P3cr3AccSGJ1ivp5SRx3Ni7JmXr7CZE4/6877.png",
    //   videoURL: "ipfs://QmdWLqsiny6tb7jDrHe5rjS9n6W7KHgmpBwMPe7LpPXE5X/nft.gif",
    //   id: "99",
    //   userName: "Vivek",
    //   avatar: "avatar",
    //   description: "Lorem",
    //   title: "Title",
    // };
    console.log(data, 'data');
    const result = await pinToIPFS(data);
    console.log(result, 'pinToIPFS result', data);
    const mainUrl: any = await result.data.data.IpfsHashURL;
    console.log('pinToIPFS result', mainUrl, result);
    return mainUrl;
  };

  const handleNewTransaction = async (data: any) => {
    const {error, message}: any = await createNewTransaction(data);
    if (error) {
      setLoading(false);
      await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
      // toast.show(message, {type: 'danger'});
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      // toast.error(
      //   CustomToastWithLink({
      //     icon: ErrorIcon,
      //     title: 'Error',
      //     description: message,
      //     time: 'Now',
      //   }),
      // );
      return;
    }
  };

  const handleCreateTransactionTable = async (err: any, data: any) => {
    console.log('error while buying listed item', err);
    console.log('lezy response data', data);
    // if (err) {
    //   setLoading(false);
    // } else {
    const newTransaction = {
      sellerWallet: data?.to ? data?.to : '',
      buyerWallet: data?.from ? data?.from : '',
      type: 'SNFT',
      itemId: SNFTDetail?.snftId,
      amount: SNFTDetail?.amount,
      currencyType: SNFTDetail?.currencyType,
      status: '1',
      txId: data?.transactionHash ? data?.transactionHash : '',
      contractAddress: data?.contractAddress ? data.contractAddress : '',
      tokenId: SNFTDetail?.tokenId,
      wallet: 'metamask',
      profileId: profileId,
      owner: data?.from ? data?.from : '',
    };
    await handleNewTransaction(newTransaction);
    if (data?.transactionHash) {
      toast.show(
        <SuccessToast
          message={`Transaction Complete for ${SNFTDetail?.SNFTTitle}`}
        />,
        {
          placement: 'top',
        },
      );
    }
    const dataaa = marketData?.filter(
      (item: any) => item?.snftId !== SNFTDetail?.snftId,
    );
    dispatch(setMarketPlaceData(dataaa));
    // navigate(SCREENS.MARKETPLACE);
    // router.push(
    //   {
    //     pathname: '/marketplace',
    //     query: {redirect: 'MySNFTs'},
    //   },
    //   '/marketplace',
    // );
    // await handleBuySnft(_snftDetails?.snftId as string);
    setLoading(false);
    // }
  };

  const getFFES = async (): Promise<string | number> => {
    let res: string | number = '';
    const chainId = await getNetwork();
    let localSigner: any = '';
    // if (metaMaskAccount.length > 0) {
    //   if (metaMaskAccount?.length > 0) {
    //     localSigner = (await getSigner()).signer;
    //   }
    // }
    const {_id} = await whichWalletConnected(
      napaWalletAccount,
      profileId,
      chainId,
    );
    const getNapaFees = await ethFees(
      // localSigner || signer,
      _id,
      chainId,
      profileId,
    );
    console.log(
      parseInt(getNapaFees, 16),
      parseInt(getNapaFees, 16) / 10 ** 18,
      'ryyryryryry',
    );
    res = parseInt(getNapaFees, 16);
    const userEthBalance: any = await getCustomTokenWalletBalance(
      chainId,
      profileId,
    );
    const usereth = userEthBalance.data?.data?.CustomTokenWalletBalance;
    console.log('Eth Format', res, usereth);
    return res;
  };

  const newLazyMint = async (data: any) => {
    const chainId = await getNetwork();
    const {_id, _address, _profile, _chainId} = await whichWalletConnected(
      napaWalletAccount,
      profileId,
      chainId,
    );
    console.log(_id, _address, _profile, _chainId, 'Wallet Data');

    //LazyMint Params
    const _amount = data?.amount;
    const amount = Number(_amount) * 10 ** 18;
    const currencyType = data?.currencyType;
    // const currencyType: string | number = 1;
    const seller = data?.generatorId;
    const tokenId = data?.tokenId;
    // const tokenId = "10000000000000000000008";
    // const _tokenUri = "https://mypethooligan.com/meta/2214";
    const _tokenUri = await generateIPFS();
    const _ethFees = await getFFES();
    const userEthBalance: any = await getCustomTokenWalletBalance(
      chainId,
      profileId,
    );
    const usereth: any = userEthBalance?.data?.data?.CustomTokenWalletBalance;
    console.log('LSKSKSSLASKSASASKASALS', usereth, _ethFees);
    if (Number(usereth) < Number(_ethFees)) {
      // alert('Insuffiecient Ethers for NAPA Fees');
      return;
    }

    try {
      const balAndAllowanceResponse: any = await checkApprovalAndBalance(
        currencyType,
        NAPA_SNFT,
      );
      console.log(
        Number(balAndAllowanceResponse.response.balance),
        Number(balAndAllowanceResponse.response.allowance),
        amount,
        'balance and allowance',
      );
      // const url = `https://sepolia.etherscan.io/tx/`;

      const isExists = await snftExists(tokenId);
      console.log(isExists, 'isExists');
      if (!isExists) {
        //check token type
        if (Number(currencyType) == 0) {
          console.log(
            'tokens checking for NAPA',
            balAndAllowanceResponse.response.balance,
            balAndAllowanceResponse.response.allowance,
            amount,
          );
          // check sufficient balance
          if (Number(balAndAllowanceResponse.response.balance) >= amount) {
            // all dependant and main functions will starts from here
            // check Allowance
            if (Number(balAndAllowanceResponse.response.allowance) < amount) {
              try {
                const approval: transactionType = await approveAny(
                  amount.toString(),
                  currencyType,
                  NAPA_SNFT,
                );
                console.log(approval, 'Approval Response for NAPA TKN');
                if (Number(approval.response) !== -1) {
                  // main lazymint body

                  const LazyResponse: transactionType = await _newLazyMint(
                    // signer,
                    _id,
                    chainId,
                    profileId,
                    tokenId,
                    seller,
                    amount.toString(),
                    currencyType.toString(),
                    _tokenUri,
                    false,
                    _ethFees.toString(),
                  );
                  console.log(await LazyResponse, 'LazyResponse for NAPA Type');
                  if (await snftExists(tokenId)) {
                    await handleCreateTransactionTable(undefined, LazyResponse);
                    // navigate(SCREENS.MARKETPLACE);
                    // router.push(
                    //   {
                    //     pathname: '/marketplace',
                    //     query: {redirect: 'MySNFTs'},
                    //   },
                    //   '/marketplace',
                    // );
                  } else {
                    // toast.show('LazyMint Failed!', {type: 'danger'});
                    toast.show(<ErrorToast message="LazyMint Failed!" />, {
                      placement: 'top',
                    });
                    await updateSaleStatus({
                      id: SNFTDetail?.snftId,
                      status: '1',
                    });
                    // alert('LazyMint Failed!');
                  }
                } else {
                  toast.show('Approval rejected', {type: 'danger'});
                  await updateSaleStatus({
                    id: SNFTDetail?.snftId,
                    status: '1',
                  });
                  // alert('Approval rejected');
                }
              } catch (e: any) {
                console.log(e, 'error While Lazymint');
                handleCreateTransactionTable(e, e);
              }
            } else {
              // main lazymint body
              try {
                const LazyResponse = await _newLazyMint(
                  // signer,
                  _id,
                  chainId,
                  profileId,
                  tokenId,
                  seller,
                  amount.toString(),
                  currencyType.toString(),
                  _tokenUri,
                  false,
                  _ethFees.toString(),
                );
                console.log(await LazyResponse, 'LazyResponse for NAPA Type');
                if (await snftExists(tokenId)) {
                  await handleCreateTransactionTable(undefined, LazyResponse);
                  navigate(SCREENS.MARKETPLACE);
                  // router.push(
                  //   {
                  //     pathname: '/marketplace',
                  //     query: {redirect: 'MySNFTs'},
                  //   },
                  //   '/marketplace',
                  // );
                } else {
                  toast.show(<ErrorToast message="LazyMint Failed!" />, {
                    placement: 'top',
                  });
                  // alert('LazyMint Failed!');
                }
              } catch (e: any) {
                console.log(e, 'error While Lazymint');
                handleCreateTransactionTable(e, e);
              }
            }
          } else {
            // you don't have enough balance
            setTransactionInProgress(false);
            toast.show(
              <ErrorToast message="You don't have suffiecient Balance" />,
              {
                placement: 'top',
              },
            );
            console.log("You don't have suffiecient Balance");
          }
        } else if (Number(currencyType) == 1) {
          console.log(
            'tokens checking for USDT',
            balAndAllowanceResponse.response.balance,
            balAndAllowanceResponse.response.allowance,
            amount,
          );
          // check sufficient balance
          if (Number(balAndAllowanceResponse.response.balance) >= amount) {
            // all dependant and main functions will starts from here
            // check Allowance
            if (Number(balAndAllowanceResponse.response.allowance) < amount) {
              try {
                const approval: transactionType = await approveAny(
                  amount.toString(),
                  currencyType,
                  NAPA_SNFT,
                );
                console.log(approval, 'Approval Response for USDT TKN');
                // main lazymint body
                if (Number(approval.response) !== -1) {
                  const LazyResponse: transactionType = await _newLazyMint(
                    // signer,
                    _id,
                    chainId,
                    profileId,
                    tokenId,
                    seller,
                    amount.toString(),
                    currencyType.toString(),
                    _tokenUri,
                    false,
                    _ethFees.toString(),
                  );
                  console.log(await LazyResponse, 'LazyResponse for USDT Type');
                  if (await snftExists(tokenId)) {
                    await handleCreateTransactionTable(undefined, LazyResponse);
                    navigate(SCREENS.MARKETPLACE);
                    // router.push(
                    //   {
                    //     pathname: '/marketplace',
                    //     query: {redirect: 'MySNFTs'},
                    //   },
                    //   '/marketplace',
                    // );
                  } else {
                    toast.show(<ErrorToast message="LazyMint Failed!" />, {
                      placement: 'top',
                    });
                    // alert('LazyMint Failed!');
                  }
                } else {
                  toast.show(<ErrorToast message="Approval rejected" />, {
                    placement: 'top',
                  });
                  // alert('Approval rejected');
                }
              } catch (e: any) {
                console.log(e);
                handleCreateTransactionTable(e, e);
              }
            } else {
              // main lazymint body
              try {
                const LazyResponse = await _newLazyMint(
                  // signer,
                  _id,
                  chainId,
                  profileId,
                  tokenId,
                  seller,
                  amount.toString(),
                  currencyType.toString(),
                  _tokenUri,
                  false,
                  _ethFees.toString(),
                );
                console.log(await LazyResponse, 'LazyResponse for USDT Type');
                if (await snftExists(tokenId)) {
                  await handleCreateTransactionTable(undefined, LazyResponse);
                  navigate(SCREENS.MARKETPLACE);
                  // router.push(
                  //   {
                  //     pathname: '/marketplace',
                  //     query: {redirect: 'MySNFTs'},
                  //   },
                  //   '/marketplace',
                  // );
                } else {
                  toast.show(<ErrorToast message="LazyMint Failed!" />, {
                    placement: 'top',
                  });
                  await updateSaleStatus({
                    id: SNFTDetail?.snftId,
                    status: '1',
                  });
                  // alert('LazyMint Failed!');
                }
              } catch (e: any) {
                console.log(e);
                handleCreateTransactionTable(e, e);
              }
            }
          } else {
            // you don't have enough balance
            setTransactionInProgress(false);
            toast.show("You don't have suffiecient Balance", {
              type: 'danger',
            });
            console.log("You don't have suffiecient Balance");
            await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
          }
        } else if (Number(currencyType) == 2) {
          // check sufficient balance
          if (Number(usereth) >= amount) {
            // all dependant and main functions will starts from here
            // main lazymint body
            try {
              const LazyResponse = await _newLazyMint(
                // signer,
                _id,
                chainId,
                profileId,
                tokenId,
                seller,
                amount.toString(),
                currencyType.toString(),
                _tokenUri,
                false,
                (Number(amount) + Number(_ethFees)).toString(),
              );
              console.log(await LazyResponse, 'LazyResponse for ETH Type');
              await handleCreateTransactionTable(undefined, LazyResponse);
              navigate(SCREENS.MARKETPLACE);
              // router.push(
              //   {
              //     pathname: '/marketplace',
              //     query: {redirect: 'MySNFTs'},
              //   },
              //   '/marketplace',
              // );
            } catch (e: any) {
              console.log(e);
              handleCreateTransactionTable(e, e);
            }
          } else {
            setTransactionInProgress(false);
            // you don't have enough allowance
            toast.show(
              <ErrorToast message="You don't have suffiecient Ether Balance" />,
              {
                placement: 'top',
              },
            );
            console.log("You don't have suffiecient Ether Balance");
            await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
          }
        } else {
          console.log('Wrong Token Type');
          await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
        }
      } else {
        console.log(`Token id ${tokenId} Already Minted!, try other`);
        toast.show(
          <SuccessToast
            message={`Token id ${tokenId} Already Minted!, try other`}
          />,
          {
            placement: 'top',
          },
        );
        // toast.show(`Token id ${tokenId} Already Minted!, try other`, {
        //   type: 'danger',
        // });
        // alert(`Token id ${tokenId} Already Minted!, try other`);
      }
    } catch (e) {
      console.log('Error while LazyMinting', e);
      toast.show(<ErrorToast message="Error while LazyMinting" />, {
        placement: 'top',
      });
      await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
    }
  };

  // decide if LazyMint or buyNFTToken
  const marketPlaceInit = async (): Promise<void> => {
    const progress: any = await AsyncStorage.getItem('SNFTInProgress');
    console.log(JSON.parse(progress), 'progress');
    if (progress == null) {
      await AsyncStorage.setItem(
        'SNFTInProgress',
        JSON.stringify([
          {title: SNFTDetail?.SNFTTitle, id: SNFTDetail?.snftId},
        ]),
      );
    } else {
      const id = JSON.parse(progress).findIndex(
        (item: any) => item.id == SNFTDetail?.snftId,
      );
      if (id == -1) {
        await AsyncStorage.setItem(
          'SNFTInProgress',
          JSON.stringify([
            ...JSON.parse(progress),
            {title: SNFTDetail?.SNFTTitle, id: SNFTDetail?.snftId},
          ]),
        );
      }
    }
    navigate(SCREENS.MARKETPLACE);
    // toast.show('Transaction is Being Processed', {
    //   type: 'success',
    // });
    toast.show(<SuccessToast message="Transaction is Being Processed" />, {
      placement: 'top',
    });
    await updateSaleStatus({id: SNFTDetail?.snftId, status: '3'});
    setTransactionInProgress(true);
    console.log(SNFTDetail.SNFTAddress, NAPA_SNFT, '_myCheck');
    try {
      const chainId = await getNetwork();
      const {_id} = await whichWalletConnected(
        napaWalletAccount,
        profileId,
        chainId,
      );
      setOpenModal(false);
      //if not SNFT
      if (
        SNFTDetail.SNFTAddress !== NAPA_SNFT &&
        SNFTDetail.SNFTAddress !==
          '0x65051d766E2EeE83dD050F7d905a9b3d6C9f6329' &&
        SNFTDetail.SNFTAddress !== '0x94d407d1860841e9a531d754ec5a6de7d899113d'
      ) {
        console.log('MARKET Transcation', 'web3 buy', SNFTDetail);
        // // marketPlace buyNFTToken function will be initiated
        if (Number(marketItemPrice) > 0) {
          const isAllowed = await checkFunds(
            marketItemCurrencyType,
            NAPA_MARKETPLACE,
            marketItemPrice,
          );
          if (isAllowed) {
            console.log('Your transaction is processing');
            console.log('buyNFTToken of Marketplace is in Progress...!');
            buyNFTToken(
              // signer,
              _id,
              chainId,
              profileId,
              SNFTDetail?.tokenId,
              marketItemPrice,
              marketItemCurrencyType,
            );
          } else {
            console.log(
              "you don't have enough assets or insufficient allowance, giving allowance wait...!",
            );
            const _res = await approveAny(
              marketItemPrice.toString(),
              marketItemCurrencyType,
              NAPA_MARKETPLACE,
            );
            console.log(_res, 'approval response');
            if (_res) {
              console.log('buyNFTToken of Marketplace is in Progress...!');
              buyNFTToken(
                // signer,
                _id,
                chainId,
                profileId,
                marketId,
                marketItemPrice,
                marketItemCurrencyType,
              );
            }
          }
        } else {
          await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
          toast.show(<WarningToast message="Invalid Price" />, {
            placement: 'top',
          });
          console.log('Invalid Price');
        }
      } else {
        //if SNFT
        if (await snftExists(SNFTDetail?.tokenId)) {
          console.log('MARKET Transcation', 'SNFT buy', SNFTDetail);
          console.log('running');
          //   // if SNFT Exists
          // then marketPlace buyNFTToken function will be initiated
          if (Number(marketItemPrice) > 0) {
            const isAllowed = await checkFunds(
              marketItemCurrencyType,
              NAPA_MARKETPLACE,
              marketItemPrice,
            );
            if (isAllowed) {
              console.log('buyNFTToken of Marketplace is in Progress...!');
              const buyRes = await buyNFTToken(
                // signer,
                _id,
                chainId,
                profileId,
                marketId,
                marketItemPrice,
                marketItemCurrencyType,
              );
              console.log('MarketItem Bought Successfully', buyRes);
              setOpen(false);
            } else {
              console.log(
                "you don't have enough assets or insufficient allowance, giving allowance wait...!",
              );
              const _res = await approveAny(
                marketItemPrice.toString(),
                marketItemCurrencyType,
                NAPA_MARKETPLACE,
              );
              console.log(_res, 'approval response');
              if (_res) {
                console.log('buyNFTToken of Marketplace is in Progress...!');
                const buyRes = await buyNFTToken(
                  // signer,
                  _id,
                  chainId,
                  profileId,
                  SNFTDetail?.tokenId,
                  marketItemPrice,
                  marketItemCurrencyType,
                );
                console.log('MarketItem Bought Successfully', buyRes);
                // toast.show(
                //   `Transaction Complete for ${SNFTDetail?.SNFTTitle} 2`,
                //   {
                //     type: 'success',
                //   },
                // );
                setOpen(false);
              }
            }
          } else {
            await updateSaleStatus({
              id: SNFTDetail?.snftId,
              status: '1',
            });
            toast.show(<WarningToast message="Invalid Price" />, {
              placement: 'top',
            });
            console.log('Invalid Price');
          }
        } else {
          console.log('MARKET Transcation', 'Lazy mint', SNFTDetail);
          //   //lazyMint will be initiated
          console.log('LazyMint of SNFT is in Progress...!');
          newLazyMint(SNFTDetail);
        }
      }
    } catch (e: any) {
      setTransactionInProgress(false);
      await updateSaleStatus({id: SNFTDetail?.snftId, status: '1'});
      console.log('Error while Minting or Buying', e);
    }
    setTransactionInProgress(false);
  };

  const handleGetNetworkFees = async () => {
    const tokenList = await handleGetImportedTokens(
      profileId,
      account,
      currentActive,
      networkType,
    );
    const napaToken = tokenList.find((token: any) => token.symbol == 'NAPA');
    if (napaToken) {
      dispatch(setSelectedTokenList(napaToken));
    } else {
      dispatch(setSelectedTokenList(tokenList[0]));
    }
    dispatch(setTokenList(tokenList));
    const typeIcon =
      SNFTDetail?.currencyType == '0'
        ? 'NAPA'
        : SNFTDetail?.currencyType == '1'
        ? 'USDT'
        : 'ETH';
    const selectedTokenBalance = tokenList?.find(
      (item: any) => item.symbol === typeIcon,
    );
    const numberOfTokens = ethers.utils.parseUnits(
      SNFTDetail?.amount.toString(),
      18,
    );
    const address = SNFTDetail?.owner;
    const params = {
      callData: {
        abi: JSON.stringify(Token),
        contractAddress: JSON.stringify(selectedTokenBalance?.tokenAddresses),
        functionName: JSON.stringify('transfer'),
        allParams: JSON.stringify([address, numberOfTokens]),
        chainId: networkType,
        profileId: profileId,
      },
    };
    const {data, error, message}: any = await fetchGasFees(params);
    if (error) {
      console.log(message, 'error Message Napa fees');
      // toast.show('Not Enough ETH For Netwrok Fees', {type: 'warning'});
      toast.show(<WarningToast message="Not Enough ETH For Netwrok Fees" />, {
        placement: 'top',
      });
      setConfirmLoading(false);
      setOpenModal(false);
      return;
    }
    const networkFee: any = Number(
      data?.data?.transactionSuccess?.GasFeesInEther,
    );
    setNetworkFee(data?.data?.transactionSuccess?.GasFeesInEther);
    const networkFeeWithPercentage = networkFee * 0.05;

    let napaFee;

    if (true) {
      const {data, error, message}: any = await getTokensMarketPrice();
      if (error) {
        // toast.show(message, {type: 'danger'});
        toast.show(<ErrorToast message={message} />, {
          placement: 'top',
        });
        setConfirmLoading(false);
        setOpenModal(false);
        return;
      }
      napaFee = 1 / data?.data?.tokenData?.response?.usdPrice;
    }
    return networkFeeWithPercentage + networkFee + napaFee;
  };

  // Check Balance
  const checkBalance = async () => {
    setConfirmLoading(true);
    const totalNetworkFee = await handleGetNetworkFees();
    if (!totalNetworkFee) {
      setConfirmLoading(false);
      setOpenModal(false);
      setSeeModal(false);
      return;
    }
    const typeIcon =
      SNFTDetail?.currencyType == '0'
        ? 'NAPA'
        : SNFTDetail?.currencyType == '1'
        ? 'USDT'
        : 'ETH';
    const selectedTokenBalance = tokenBalance?.find(
      (item: any) => item.symbol === typeIcon,
    );
    const etherumBalance = tokenBalance?.find(
      (item: any) => item.symbol === 'ETH',
    );
    if (SNFTDetail?.amount > selectedTokenBalance?.balance) {
      console.log(
        `Insufficient ${selectedTokenBalance?.symbol} Balance For Purchase`,
      );
      // toast.show(
      //   `Insufficient ${selectedTokenBalance?.symbol} Balance For Purchase`,
      //   {
      //     type: 'danger',
      //   },
      // );
      toast.show(
        <ErrorToast
          message={`Insufficient ${selectedTokenBalance?.symbol} Balance For Purchase`}
        />,
        {placement: 'top'},
      );
      setConfirmLoading(false);
      setOpenModal(false);
      setSeeModal(false);
      return;
    }
    if (etherumBalance?.balance < totalNetworkFee) {
      console.log('Insufficient ETH For Transaction Fee');
      // toast.show('Insufficient ETH For Transaction Fee', {type: 'danger'});
      toast.show(
        <ErrorToast message="Insufficient ETH For Transaction Fee" />,
        {placement: 'top'},
      );
      setConfirmLoading(false);
      setOpenModal(false);
      setSeeModal(false);
      return;
    }
    setConfirmLoading(false);
    setIsOpenPayNowButton(true);
  };

  // Currency Icon
  const handleCurrenyIcon = (currencyType: string = '0') => {
    if (currencyType == '0') {
      return (
        <NapaTokenIcon
          bgColor={themeColors.aquaColor}
          iconColor={themeColors.secondaryColor}
          width={25}
          height={25}
        />
      );
    }
    if (currencyType == '1') {
      return (
        <TetherIcon
          bgColor="#FFD978"
          iconColor="white"
          width={25}
          height={25}
        />
      );
    } else {
      return (
        <EthereumIcon
          bgColor="#6481E7"
          iconColor={themeColors.primaryColor}
          width={25}
          height={25}
        />
      );
    }
  };
  // Video Play Or Pause Work
  const onEnd = () => {
    setShowPauseButton(true);
    if (Platform.OS == 'android') {
      videoRef.current.seek(0);
    }
    setRepeat(false);
  };
  const onPlayButtonPress = () => {
    console.log('test test');
    setShowPauseButton(false);
    videoRef.current.seek(0);
    setRepeat(true);
  };
  const handleDeleteSnft = async () => {
    setIsLoading(true);
    const {error, message} = await deleteSnft(snftId);
    if (error) {
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      setIsLoading(false);
    }
    dispatch(MarketPlaceData(24));
    setIsLoading(false);
    navigate(SCREENS.MARKETPLACE);
  };

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const H_MAX_HEIGHT = verticalScale(430);
  const H_MIN_HEIGHT = 100;
  const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

  const headerScrollHeight: any = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const [earningData, setEarningData] = useState<EarningDataI>();
  const [videoMute, setVideoMute] = useState(false);
  const getEarning = async () => {
    const {data}: any = await getPostViewsRollings(SNFTDetail?.postId);

    setEarningData(data?.data);
  };
  useEffect(() => {
    getEarning();
  }, [SNFTDetail]);

  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: headerScrollHeight,
          width: '100%',
          overflow: 'hidden',
          zIndex: 999,
          // padding: 10,
        }}>
        <ImageBackground
          imageStyle={{
            height:
              SNFTDetail.listed == '0'
                ? verticalScale(410)
                : verticalScale(355),
            flex: 1,
          }}
          style={styles.profileGradient}
          source={require('../assets/images/marketPlaceGradient.png')}>
          <ImageBackground
            imageStyle={{
              height:
                SNFTDetail.listed == '0'
                  ? verticalScale(410)
                  : verticalScale(355),
            }}
            source={require('../assets/images/marketPlaceGradient.png')}>
            <Video
              ref={videoRef}
              source={{
                uri:
                  Platform.OS == 'ios'
                    ? SNFTDetail?.videoURL
                    : SNFTDetail?.mobileVideoURL,
              }}
              paused={showPauseButton}
              repeat={Platform.OS == 'ios' && repeat}
              style={{
                height:
                  SNFTDetail.listed == '0'
                    ? verticalScale(410)
                    : verticalScale(355),
                width: '100%',
                position: 'relative',
              }}
              resizeMode="cover"
              muted={!videoMute}
              onEnd={onEnd}
            />
            {showPauseButton && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  zIndex: 999,
                }}
                onPress={() => {
                  onPlayButtonPress();
                }}>
                <PlayIcon />
              </TouchableOpacity>
            )}

            <View style={{position: 'absolute'}}>
              <View
                style={{
                  marginTop: 30,
                }}>
                <Header
                  leftChildren={
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => goBack()}>
                        <BackIcon />
                      </TouchableOpacity>
                    </View>
                  }
                  title={false}
                  rightChildren={
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'flex-end',
                      }}>
                      <TouchableOpacity style={styles.starIcon}>
                        <StarIcon />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <DoubleDotIcon />
                      </TouchableOpacity>
                    </View>
                  }
                />
                <TouchableOpacity
                  style={{alignItems: 'flex-end'}}
                  onPress={() => setVideoMute(!videoMute)}>
                  {videoMute ? (
                    <UnMuteIcon color="white" />
                  ) : (
                    <MuteIcon color="white" />
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.container,
                  {
                    height:
                      SNFTDetail.listed == '0'
                        ? verticalScale(320)
                        : verticalScale(280),
                  },
                ]}>
                <View style={styles.profile}>
                  <Image
                    style={{height: 40, width: 40, borderRadius: 50}}
                    source={{uri: SNFTDetail?.userImage}}
                  />
                  <Text style={styles.profileTitle}>
                    {SNFTDetail?.userName}
                  </Text>
                </View>
                <View style={styles.profileTextContainer}>
                  <Text style={styles.heading}>{SNFTDetail?.SNFTTitle} </Text>
                  <Text style={styles.subHeading}>
                    {SNFTDetail?.SNFTDescription}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </ImageBackground>
        {SNFTDetail?.listed !== '0' && (
          <View
            style={{
              marginHorizontal: moderateScale(24),
              marginTop: moderateScale(10),
              marginBottom: moderateScale(15),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: moderateScale(50),
            }}>
            <View style={{width: '60%'}}>
              <Text
                style={{
                  color: themeColors.primaryColor,
                  marginBottom: moderateScale(5),
                  fontFamily: Fontfamily.Avenier,
                  fontSize: size.default,
                  fontWeight: '500',
                }}>
                Fixed Price
              </Text>
              <View style={styles.marketDetailContainer}>
                {handleCurrenyIcon(SNFTDetail?.currencyType)}
                <Text style={styles.marketDetailPoints}>
                  {SNFTDetail?.amount}
                </Text>
              </View>
            </View>
            <View style={{width: '40%'}}>
              <Text
                style={{
                  color: themeColors.primaryColor,
                  marginBottom: moderateScale(5),
                  fontFamily: Fontfamily.Avenier,
                  fontSize: size.default,
                  fontWeight: '500',
                }}>
                Ending In
              </Text>
              <View style={[styles.marketDetailContainer]}>
                <TimeIcon />
                <Text
                  style={[
                    styles.marketDetailPointsEnd,
                    {marginLeft: moderateScale(8)},
                  ]}>
                  <LiveTime
                    targetTime={new Date(SNFTDetail.createdAt).setHours(
                      new Date(SNFTDetail.createdAt).getHours() + duration * 24,
                    )}
                    marketPlaceItem={true}
                    snftId={SNFTDetail?.snftId}
                  />
                </Text>
              </View>
            </View>
          </View>
        )}
      </Animated.View>
      <View
        style={{
          backgroundColor: themeColors.secondaryColor,
          flex: 1,
          justifyContent: 'space-between',
          // marginTop: SNFTDetail.listed !== '0' ? 0 : moderateScale(-50),
        }}>
        <View style={{flex: 1, paddingTop: H_MAX_HEIGHT}}>
          <View style={[styles.marketDetailTabs]}>
            <TouchableOpacity
              onPress={() => {
                setDetail(true), setHistory(false), setPreviousEarning(false);

                setTopScroll(true);
              }}>
              <Text style={styles.marketDetailTabsText}>Details</Text>
              <Text style={[detail && styles.tabBorderDetails]}></Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                onPress={() => {
                  setDetail(false), setHistory(true), setPreviousEarning(false);
     
                }}>
                <Text style={styles.marketDetailTabsText}>View History</Text>
                <Text style={[history && styles.tabBorderHistory]}></Text>
              </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                setDetail(false);
                setHistory(false);
                setPreviousEarning(true);
              }}>
              <Text style={styles.marketDetailTabsText}>Views Earnings</Text>
              <Text
                style={[previousEarning && styles.tabBorderEarnings]}></Text>
            </TouchableOpacity>
          </View>
          <ScrollView scrollEnabled={true} style={{height: 600}}>
            {detail && (
              <MarketPriceDetail
                snftDetail={SNFTDetail}
                handleCurrenyIcon={handleCurrenyIcon}
              />
            )}
            {history && <MarketPriceHistory />}
            {previousEarning && <PreviousEarning earningData={earningData} />}
          </ScrollView>
        </View>
        {/* )} */}
        {isLoading ? (
          <View style={styles.buyButtonLoader}>
            <ActivityIndicator color="#fff" size="large" />
          </View>
        ) : SNFTDetail?.listed !== '0' ? (
          <View style={styles.buyButton}>
            <TouchableOpacity
              style={styles.buy}
              disabled={
                profileId === SNFTDetail?.profileId
                  ? (SNFTDetail?.listed === '2' ||
                      SNFTDetail?.listed === '0') &&
                    true
                  : false
              }
              onPress={() => {
                if (SNFTDetail?.listed == '3') {
                  toast.show(
                    <ErrorToast message="Item is Being Purchased by Another User" />,
                    {
                      placement: 'top',
                    },
                  );
                  return;
                }
                if (profileId === SNFTDetail?.profileId) {
                  navigate(SCREENS.SELL, {id: snftId, nft: false});
                  return;
                }
                if (SNFTDetail?.listed === '2') {
                  return;
                }
                // setOpenModal(true);
                setSeeModal(true);
              }}>
              {profileId !== SNFTDetail?.profileId && !isSeller ? (
                SNFTDetail?.listed === '2' ? (
                  <Text style={styles.buyText}>Sold</Text>
                ) : (
                  <Text style={styles.buyText}>
                    Buy for {SNFTDetail?.amount}{' '}
                    {SNFTDetail?.currencyType == '0'
                      ? 'NAPA'
                      : SNFTDetail?.currencyType == '1'
                      ? 'USDT'
                      : 'ETH'}
                  </Text>
                )
              ) : (
                <Text style={styles.buyText}>Edit</Text>
              )}
            </TouchableOpacity>
            {(profileId === SNFTDetail?.profileId &&
              SNFTDetail?.listed == '1') ||
            SNFTDetail?.listed == '2' ? (
              <TouchableOpacity
                onPress={() => {
                  SNFTDetail?.listed == '1' && handleDeleteSnft();
                }}
                disabled={SNFTDetail?.listed == '2'}
                style={styles.buySubmit}>
                <Text style={styles.buyTextSubmit}>
                  {SNFTDetail?.listed == '2' ? 'Sold' : 'Delist'}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigate(SCREENS.SUBMITOFFER)}
                disabled={SNFTDetail?.type == 'Fixed Price'}
                style={styles.buySubmit}>
                <Text style={styles.buyTextSubmit}>Submit Offer</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => navigate(SCREENS.SELL, {id: snftId, nft: false})}
            style={styles.sellButton}>
            <Text style={styles.sellbuttonText}>Sell</Text>
          </TouchableOpacity>
        )}

        {seeModal && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={seeModal}
            onRequestClose={() => {
              setSeeModal(false);
            }}>
            <View style={styles.modalContainer}>
              <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={10}
                overlayColor="transparent"
                reducedTransparencyFallbackColor="white"
              />
              <View style={styles.container1}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.title}>{dummydata.Congratulations}</Text>
                  <TouchableOpacity onPress={() => setSeeModal(true)}>
                    <Text style={[styles.snftTitle]}>
                      {SNFTDetail?.SNFTTitle}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: verticalScale(20)}}>
                  <Text
                    style={{
                      fontSize: size.lg,
                      color: themeColors.primaryColor,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontFamily: Fontfamily.Avenier,
                      lineHeight: 25,
                    }}>
                    {dummydata.Message}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setOpenModal(true)}
                  style={styles.seeDetail}>
                  <Text style={styles.seeDetailText}>See Details</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => setSeeModal(false)}
                style={styles.crossStyle}>
                <LightCrossIcon
                  color="#fff"
                  opacity={3}
                  width={35}
                  height={35}
                />
              </TouchableOpacity>
            </View>
          </Modal>
        )}

        {openModal && (
          <BuyModal
            setModalOpen={setOpenModal}
            // HeaderTitle="Buy SNFT"
            Title={dummydata.Title}
            Description={dummydata?.Description}
            NetworkFees={dummydata.NetworkFees}
            TransactionType={dummydata.TransactionType}
            confirmTransaction={dummydata.confirmTransaction}
            minDetail={SNFTDetail}
            isLoading={transactionInProgress}
            TokenId={SNFTDetail?.tokenId}
            contractAddress={SNFTDetail?.SNFTAddress}
            originalCreator={SNFTDetail?.generatorName}
            Seller={SNFTDetail?.owner}
            Buyer={napaWalletAccount}
            creatorFees={SNFTDetail?.creatorFees}
            SNFTTitle={SNFTDetail?.SNFTTitle}
            eligibileForCoBatching={
              SNFTDetail?.eligibileForCoBatching == 'true' ? true : false
            }
            totalSpend={SNFTDetail?.amount}
            Congratulations={dummydata.Congratulations}
            message={dummydata.Message}
            currencyType={SNFTDetail?.currencyType}
            isOpenPayNowButton={isOpenPayNowButton}
            checkBalance={checkBalance}
            setIsOpenPayNowButton={setIsOpenPayNowButton}
            confirmLoading={confirmLoading}
          />
        )}
      </View>
    </>
  );
};
export default MarketPlaceDetailSNFT;

const styles = StyleSheet.create({
  starIcon: {
    marginRight: moderateScale(15),
  },
  container: {
    paddingHorizontal: moderateScale(24),
    justifyContent: 'flex-end',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTitle: {
    marginLeft: moderateScale(10),
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontWeight: '500',
    fontSize: size.default,
  },
  profileTextContainer: {},
  heading: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: size.xxlg,
    fontWeight: '500',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(12),
    lineHeight: verticalScale(28),
  },
  subHeading: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
    fontWeight: '500',
    lineHeight:
      Dimensions.get('window').width < 400
        ? verticalScale(15)
        : verticalScale(20),
    marginBottom:
      Dimensions.get('window').width < 400
        ? verticalScale(0)
        : verticalScale(20),
  },
  marketDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marketDetailPoints: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.lg,
    marginLeft: moderateScale(10),
    fontWeight: '500',
  },
  marketDetailPointsEnd: {
    color: themeColors.primaryColor,
    fontFamily: Fontfamily.Grostestk,
    fontSize: size.lg,
    fontWeight: '500',
  },
  marketDetailTabs: {
    paddingHorizontal: moderateScale(24),
    flexDirection: 'row',
    paddingBottom: moderateScale(5),
  },
  marketDetailTabsText: {
    color: themeColors.primaryColor,
    marginRight: moderateScale(20),
  },
  buyButtonLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70,
    backgroundColor: themeColors.aquaColor,
  },
  buyButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: themeColors.cardsColor,
  },
  buy: {
    backgroundColor: themeColors.aquaColor,
    // paddingVertical:
    //   Platform.OS == 'ios' ? moderateScale(15) : moderateScale(20),
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  buySubmit: {
    backgroundColor: themeColors.lightAquaColor,
    // paddingVertical:
    //   Platform.OS == 'ios' ? moderateScale(15) : moderateScale(20),
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  buyText: {
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
  sellButton: {
    backgroundColor: themeColors.aquaColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  buyTextSubmit: {
    textAlign: 'center',
    color: themeColors.primaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
  sellbuttonText: {
    textAlign: 'center',
    color: themeColors.secondaryColor,
    fontSize: size.default,
    fontWeight: '400',
    fontFamily: Fontfamily.Neuropolitical,
  },
  profileGradient: {
    // paddingBottom: moderateScale(18),
  },
  tabBorderDetails: {
    borderBottomWidth: 1,
    borderBottomColor: themeColors.primaryColor,
    marginTop: -15,
    width: 45,
  },
  tabBorderHistory: {
    borderBottomWidth: 1,
    borderBottomColor: themeColors.primaryColor,
    marginTop: -13,
    width: 80,
  },
  tabBorderEarnings: {
    borderBottomWidth: 1,
    borderBottomColor: themeColors.primaryColor,
    marginTop: -13,
    width: 98,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: themeColors.secondaryColor,
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
  container1: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: moderateScale(20),
    paddingHorizontal: moderateScale(10),
  },
  title: {
    color: themeColors.primaryColor,
    fontSize: Dimensions.get('window').width < 337 ? size.default : size.lg,
    fontWeight: '500',
    fontFamily: Fontfamily.Neuropolitical,
    marginBottom: moderateScale(10),
    // textAlign: 'center',
  },
  snftTitle: {
    color: themeColors.aquaColor,
    fontSize: Dimensions.get('window').width < 337 ? size.default : size.lg,
    fontWeight: '500',
    fontFamily: Fontfamily.Neuropolitical,
    marginBottom: moderateScale(10),
    marginLeft: moderateScale(5),
    textAlign: 'center',
  },
  seeDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(30),
  },
  seeDetailText: {
    color: themeColors.aquaColor,
    alignItems: 'center',
    fontSize: size.lg,
    fontWeight: 'bold',
    lineHeight: 25,
  },
  crossStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: moderateScale(30),
  },
});
