import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../theme/colors';
import {moderateScale} from 'react-native-size-matters';
import {size} from '../theme/fontstyle';
import MintDropDown from '../common/MintDropDown';
import {listingDuration, maximumOffer} from '../const/sellTypes';
import {Fontfamily} from '../theme/fontFamily';
import ToggleSwitch from 'toggle-switch-react-native';
import RangeSlider from '../common/RangeSlider';
import {useNavigation} from '@react-navigation/native';
import BuyModal from '../common/BuyModal';
import {createNewSnft, updateSnft} from '../services/MarketPlace';
import {useDispatch, useSelector} from 'react-redux';
import {selectProfileList} from '../store/selectors/profileDetailSelector';
import {transactionModalType} from '../typings/TxModal';
import {useToast} from 'react-native-toast-notifications';
import {
  selectActiveWalletAddress,
  selectNetworkType,
} from '../store/selectors/NapaAccount';
import {SCREENS} from '../typings/screens-enums';
import PreViewModal from '../components/PreViewModal';
import {whichWalletConnected} from '../utils/handleWallet';
import {NAPA_MARKETPLACE, NAPA_SNFT} from '../utils/addressHelper';
import {setApprovalForAll as snftSetApprovalForAll} from '../utils/snftCallHelper';
import {MarketPlaceData} from '../store/slices/MarketPlaceItem';
import {approve as GNFTApproval} from '../utils/genericNFTCallHelper';
import {getFees, setSale} from '../utils/marketPlace';
import CurrencyDropdown from '../common/CurrencyDropdown';
import {set} from 'lodash';
import ErrorToast from '../common/toasters/ErrorToast';
import SuccessToast from '../common/toasters/SuccessToast';

const FixedPrice = ({
  loading,
  mintDetails,
  snftDetails,
  contract,
  tokenId,
}: any) => {
  const toast = useToast();
  const {navigate} = useNavigation<any>();
  const currencyIcon: any = ['NAPA', 'USDT', 'ETH'];
  const [currencyType, setCurrencyType] = useState<any>();
  // const [listing, setListingDuration] = useState<any>();
  const [amount, setAmount] = useState<any>();
  const [specificBuyer, setSpecificBuyer] = useState<boolean>(false);
  const [eligible, setEligible] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const profileId = useSelector(selectProfileList)?.profileId;
  const [validation, setValidation] = useState<string>('');
  const [creatorFees, setCreatorFees] = React.useState<any>('');
  const [duration, setDuration] = React.useState<any>();
  const [type, setType] = React.useState('Fixed Price');
  const [buyNow, setBuyNow] = React.useState<string>('');
  const [maxOffer, setMaxOffer] = React.useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [signer, _setSigner] = React.useState<any>('');
  const [_account, _setAccount] = React.useState<any>('');
  const [_balance, _setBalance] = React.useState<any>('');
  const [web3contract, setWeb3Contract] = React.useState<any>('');
  const [web3TokenId, setWeb3TokenId] = React.useState<any>('');
  const napaWalletAccount = useSelector(selectActiveWalletAddress);
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const [isPreViewModalVisible, setIsPreViewModalVisible] =
    useState<any>(false);
  const networkType = useSelector(selectNetworkType)?.value;
  const [errors, setErrors] = useState({
    currencyType: '',
    amount: '',
    duration: '',
    maxOffer: '',
    buyNow: '',
    creatorFees: '',
    offerSpread: '',
    validationError: '',
  });
  useEffect(() => {
    // console.log(router.query, 'new-dart-for-marketitem');
    if (web3contract?.length !== '' && web3TokenId?.length !== '') {
      setWeb3Contract(contract);
      setWeb3TokenId(tokenId);
    }

    if (snftDetails) {
      console.log(snftDetails, 'snftDetails');
      const currencyTypeIndex = currencyIcon.findIndex(
        (item: string) => item == snftDetails.currencyType,
      );

      if (currencyTypeIndex) {
        setCurrencyType(
          snftDetails?.currencyType == '0'
            ? 'NAPA'
            : snftDetails?.currencyType == '1'
            ? 'USDT'
            : 'ETH',
        );
      } else {
        setCurrencyType(null);
      }
      const durationIndex = listingDuration.findIndex(
        option => snftDetails?.duration == option.value,
      );
      if (durationIndex > -1) {
        setDuration(snftDetails?.duration);
      } else {
        setDuration(null);
      }
      const offerIndex = maximumOffer.findIndex(
        option => snftDetails?.maxOffer == option.value,
      );
      if (offerIndex > -1) {
        setMaxOffer(snftDetails?.maxOffer);
      } else {
        setMaxOffer(null);
      }
      if (snftDetails?.amount) {
        setAmount(snftDetails?.amount);
      } else {
        setAmount('');
      }
      if (snftDetails?.type) {
        setType(snftDetails?.type);
      } else {
        setType('Fixed Price');
      }
      if (snftDetails?.specificBuyer) {
        setSpecificBuyer(true);
        setValidation(snftDetails?.specificBuyer);
      }
      if (snftDetails?.eligibileForCoBatching == 'true') {
        setEligible(true);
      }
      if (snftDetails?.creatorFees) {
        setCreatorFees(snftDetails?.creatorFees);
      }
    }
    // console.log(router?.query?.contract === undefined, 'My Hooks');
    // console.log(typeof router?.query?.contract, 'My Hooks');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snftDetails]);

  const dummydataWeb2: transactionModalType = {
    // Title: 'List SNFT',
    WalletID: napaWalletAccount,
    Description: 'You are listing your SNFT for sale into the NAPA marketplace',
    NetworkFees: '0.000726592093',
    SpendAmount: '0.000000998723',
    TotalSpend: '0.00083799872',
    TransactionID: '0x66f1c1.....0800f4a0',
    TransactionType: 'List SNFT',
    Message: `Listing your SNFT in the NAPA marketplace and sell your post to trigger the earnings based on views.\n \n As a creator you will earn the creator fees of the views for the lifespan of your post. Good luck and congratulations on your sale! 👏 `,
    confirmTransaction(): Promise<void> {
      return handleCreateSnft();
    },
  };

  const dummydataWeb3: transactionModalType = {
    Title: 'List NFT',
    WalletID: napaWalletAccount,
    Description: 'List NFT in NAPA MarketPlace',
    NetworkFees: '0.000726592093',
    SpendAmount: '0.000000998723',
    TotalSpend: '0.00083799872',
    TransactionID: '0x66f1c1.....0800f4a0',
    TransactionType: 'List NFT',
    confirmTransaction(): Promise<void> {
      return web3Listing();
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
    console.log(walletNetwork, 'walletNetwork');
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

  const newSetList = async () => {
    let response;
    try {
      const chainId = await getNetwork();
      const {_id} = await whichWalletConnected(
        napaWalletAccount,
        profileId,
        chainId,
      );
      const SNFTContractAddress = NAPA_SNFT;
      const ApproveResponse: any = await snftSetApprovalForAll(
        _id,
        chainId,
        profileId,
        SNFTContractAddress,
        true,
      );
      console.log(
        ApproveResponse.response,
        ApproveResponse.transactionHash,
        'ApproveResponse for SNFT',
      );
      response = ApproveResponse;
      return response;
    } catch (e) {
      console.log('Error while giving the Approval for SNFT', e);
      return response;
    }
  };

  const handleCreateSnft = async () => {
    // alert("web 2 listing")
    setErrors({
      currencyType: '',
      amount: '',
      duration: '',
      maxOffer: '',
      buyNow: '',
      creatorFees: '',
      offerSpread: '',
      validationError: '',
    });
    // const vald = validation?.includes('@');
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const ethAddressPattern = /^(0x)?[0-9a-fA-F]{40}$/;
    // if (specificBuyer) {
    //   if (!validation) {
    //     setErrors(prev => {
    //       return {
    //         ...prev,
    //         validationError: 'Email or Etherum Address is required',
    //       };
    //     });
    //   }
    //   if (vald) {
    //     const emailValidate = emailRegex.test(validation);
    //     if (!emailValidate) {
    //       setErrors(prev => {
    //         return {
    //           ...prev,
    //           validationError: 'Email Address is invalid',
    //         };
    //       });
    //     }
    //   }
    //   if (!vald) {
    //     const etherumValidate = ethAddressPattern.test(validation);
    //     if (!etherumValidate) {
    //       setErrors(prev => {
    //         return {
    //           ...prev,
    //           validationError: 'Etherum Address is invalid',
    //         };
    //       });
    //     }
    //   }
    // }
    // if (mintDetails?.marketplace_listed == 'true') {
    //   toast.show('Listed In Marketplace', {
    //     type: 'danger',
    //   });
    //   return;
    // }
    // if (!currencyType) {
    //   setErrors(prev => {
    //     return {
    //       ...prev,
    //       currencyType: 'Currency type is required',
    //     };
    //   });
    // }
    // if (!amount) {
    //   setErrors(prev => {
    //     return {
    //       ...prev,
    //       amount: 'Amount is required',
    //     };
    //   });
    // }
    // if (!creatorFees) {
    //   setErrors(prev => {
    //     return {
    //       ...prev,
    //       creatorFees: 'Creator Fees is required',
    //     };
    //   });
    // }
    // if (!offerSpread) {
    //   setErrors(prev => {
    //     return {
    //       ...prev,
    //       offerSpread: 'Offer Spread is required',
    //     };
    //   });
    // }
    // if (offerSpread > 5) {
    //   setErrors(prev => {
    //     return {
    //       ...prev,
    //       offerSpread: 'Offer Spread must be from 0% to 5% max',
    //     };
    //   });
    // }
    if (creatorFees > 20) {
      setErrors(prev => {
        return {
          ...prev,
          creatorFees: 'Creator Fees must be from 0% to 20% max',
        };
      });
    }
    if (!duration) {
      setErrors(prev => {
        return {
          ...prev,
          duration: 'Duration is required',
        };
      });
    }
    if (type == 'Time Based Auction' && !buyNow) {
      setErrors(prev => {
        return {
          ...prev,
          buyNow: 'Buy Now is required',
        };
      });
    }
    if (type == 'Time Based Auction' && !maxOffer) {
      setErrors(prev => {
        return {
          ...prev,
          maxOffer: 'Maximum Offers is required for time based auction',
        };
      });
    }
    console.log('IN the END');
    if (
      !duration ||
      !amount ||
      !currencyType ||
      !creatorFees ||
      // !offerSpread ||
      // (type == 'Time Based Auction' && !maxOffer) ||
      // offerSpread == '' ||
      creatorFees == '' ||
      (specificBuyer && validation == '')
    )
      return;
    setIsLoading(true);
    // let id = "101"
    console.log('Initiated......');
    const amountInDecimals = Number(amount.toString()) * 10 ** 18;
    console.log('amount', amountInDecimals);
    console.log('Initiated2...', amountInDecimals);

    // new Listing setup ->
    const newListing = await newSetList();
    console.log(await newListing, 'new Listing response');
    // new Listing setup <-

    // const deployedWeb3 = await listNFT(
    //   mintDetails?.tokenId as string,
    //   amountInDecimals.toString(),
    //   nftAddress
    // );

    console.log(newListing, 'web3 setApproval triggered...!');

    if (newListing) {
      const newSnft: any = {
        currencyType:
          currencyType == 'NAPA'
            ? '0'
            : (currencyType == 'USDT' && '1' && currencyType == 'ETH' && '2') ||
              '',
        type,
        amount,
        duration: duration || '',
        mintId: mintDetails?.mintId || '',
        profileId: mintDetails?.profileId || '',
        postId: mintDetails?.postId || '',
        maxOffer: maxOffer || '',
        eligibileForCoBatching: eligible == true ? 'true' : 'false',
        creatorFees: creatorFees || '',
        specificBuyer: specificBuyer == true ? validation : '',
      };
      const {data, error, message}: any = await createNewSnft(newSnft);
      if (error) {
        setIsLoading(false);
        toast.show(<ErrorToast message={message} />, {
          placement: 'top',
        });
        console.log(message, 'error newSNFT');
        return;
      }
      setIsLoading(false);
      setCurrencyType(null);
      setAmount('');
      setDuration(null);
      setMaxOffer(null);
      setType('Fixed Price');
      setModalOpen(false);
      toast.show(<SuccessToast message='SNFT was sucessfully listed in marketplace' />, {
        placement: 'top',
      });
      navigate(SCREENS.MARKETPLACE);
      // push('/marketplace');
    } else {
      setIsLoading(false);
    }
  };

  const handleUpdateSnft = async () => {
    setErrors({
      currencyType: '',
      amount: '',
      duration: '',
      maxOffer: '',
      buyNow: '',
      creatorFees: '',
      offerSpread: '',
      validationError: '',
    });
    const vald = validation?.includes('@');
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const ethAddressPattern = /^(0x)?[0-9a-fA-F]{40}$/;
    if (specificBuyer) {
      if (!validation) {
        setErrors(prev => {
          return {
            ...prev,
            validationError:
              'Email or Etherum Address is required for specific buyer',
          };
        });
      }
      if (vald) {
        const emailValidate = emailRegex.test(validation);
        if (!emailValidate) {
          setErrors(prev => {
            return {
              ...prev,
              validationError: 'Email Address is invalid',
            };
          });
        }
      }
      if (!vald && validation !== '') {
        const etherumValidate = ethAddressPattern.test(validation);
        if (!etherumValidate) {
          setErrors(prev => {
            return {
              ...prev,
              validationError: 'Etherum Address is invalid',
            };
          });
        }
      }
    }
    if (!currencyType) {
      setErrors(prev => {
        return {
          ...prev,
          currencyType: 'Currency type is required',
        };
      });
    }
    if (type == 'Time Based Auction' && !buyNow) {
      setErrors(prev => {
        return {
          ...prev,
          currencyType: 'Buy Now is required',
        };
      });
    }
    if (!amount) {
      setErrors(prev => {
        return {
          ...prev,
          amount: 'Amount is required',
        };
      });
    }
    if (!duration) {
      setErrors(prev => {
        return {
          ...prev,
          duration: 'Duration is required',
        };
      });
    }
    if (type == ' TimeBased Auction' && !maxOffer) {
      setErrors(prev => {
        return {
          ...prev,
          maxOffer: 'Maximum Offer is required for Time Based Auction',
        };
      });
    }
    // if (
    //   !duration ||
    //   !amount ||
    //   !currencyType ||
    //   (type == 'Time Based Auction' && !maxOffer)
    // )
    //   return;
    if (
      !currencyType ||
      currencyType === 'undefined' ||
      currencyType === '' ||
      !amount ||
      !duration ||
      duration === 'undefined' ||
      duration === '' ||
      !creatorFees ||
      (specificBuyer && validation == '')
    )
      return;

    setIsLoading(true);
    const updatedSnft = {
      currencyType:
        currencyType == 'NAPA'
          ? '0'
          : (currencyType == 'USDT' ? '1' : '2') || '',
      type,
      amount,
      duration: duration || '',
      mintId: mintDetails?.mintId || '',
      maxOffer: maxOffer || '',
      eligibileForCoBatching: eligible == true ? 'true' : 'false',
      creatorFees: creatorFees || '',
      specificBuyer: specificBuyer == true ? validation : '',
    };
    console.log(updatedSnft, 'updatedSnft');

    const {error, message}: any = await updateSnft(updatedSnft);
    if (error) {
      setIsLoading(false);
      toast.show(<ErrorToast message={message} />, {
        placement: 'top',
      });
      return;
    }
    setIsLoading(false);
    setCurrencyType(null);
    setAmount('');
    setDuration(null);
    setType('Fixed Price');
    setMaxOffer(null);
    dispatch(MarketPlaceData(24));
    toast.show(<SuccessToast message='SNFT has been successfully Updated' />, {
      placement: 'top',
    });
    navigate(SCREENS.MARKETPLACE);
  };

  const web3NFTApproval = async (
    _token: string,
    _contract: string,
  ): Promise<any> => {
    let response: any = {response: -1, transactionHash: -1};
    try {
      const chainId = await getNetwork();
      const {_id} = await whichWalletConnected(
        napaWalletAccount,
        profileId,
        chainId,
      );
      if (_token !== undefined && _contract !== undefined) {
        const ApproveResponse: any = await GNFTApproval(
          _id,
          chainId,
          profileId,
          NAPA_MARKETPLACE,
          _token,
          _contract,
        );
        console.log(
          ApproveResponse.response,
          ApproveResponse.transactionHash,
          'ApproveResponse for Any NFT/SNFT',
        );
        response = ApproveResponse;
        return response;
      } else {
        // alert(`Contract or Id not found ${router.query?.contract}`);
        return {response: -1, transactionHash: -1};
      }
    } catch (e) {
      console.log('Error while giving the Approval for SNFT/NFT', e);
      return response;
    }
  };

  const getListingFees = async () => {
    let response: number | string = 0;
    try {
      const chainId = await getNetwork();
      const {_id} = await whichWalletConnected(
        napaWalletAccount,
        profileId,
        chainId,
      );
      const _fees = await getFees(
        // signer,
        _id,
        chainId,
        profileId,
      );
      response = _fees;
      let _res = parseInt(response.toString(), 16);
      console.log(`Marketplace Fees: `, _res);
      return _res;
    } catch (e) {
      console.log('Error while giving the Approval', e);
      return response;
    }
  };

  const web3Listing = async (): Promise<void> => {
    // alert("actual web3 Item Listing...!")
    setIsLoading(true);
    console.log('actual web3 Item Listing...!');
    let response;
    try {
      const chainId = await getNetwork();
      const {_id} = await whichWalletConnected(
        napaWalletAccount,
        profileId,
        chainId,
      );
      const _approvalRes: any = await web3NFTApproval(
        web3TokenId,
        web3contract,
      );
      if (_approvalRes.response !== -1) {
        const listingPrice = await getListingFees();
        console.log(listingPrice, 'listingPricelistingPrice');
        if (Number(listingPrice) >= 0) {
          const _listResponse: any = await setSale(
            // signer,
            _id,
            chainId,
            profileId,
            web3TokenId,
            Number(amount) * 10 ** 18,
            web3contract,
            currencyType === 'NAPA' ? '0' : currencyType === 'USDT' ? '1' : '2',
            true,
            listingPrice,
          );
          console.log(
            _listResponse.response,
            _listResponse.transactionHash,
            '_listResponse for SNFT',
          );
          response = _listResponse;
          if (response.response !== -1) {
            navigate(SCREENS.MARKETPLACE);
            // router.push(
            //   {
            //     pathname: '/marketplace',
            //     query: {redirect: 'MyNFTs'},
            //   },
            //   '/marketplace',
            // );
          }
        } else {
          toast.show(<ErrorToast message='Couldn"t get ListingFees' />, {
            placement: 'top',
          });
          // alert("Couldn't get ListingFees");
        }
      } else {
        toast.show(<ErrorToast message='Approval Failed' />, {
          placement: 'top',
        });
        // alert('Approval Failed');
      }
      setIsLoading(false);
      console.log(response, 'Web3 Listed');
    } catch (e) {
      toast.show(<ErrorToast message='Error while giving the Approval for SNFT' />, {
        placement: 'top',
      });
      console.log('Error while giving the Approval for SNFT', e);
    }
  };

  const completeListingModal = () => {
    setErrors({
      currencyType: '',
      amount: '',
      duration: '',
      maxOffer: '',
      buyNow: '',
      creatorFees: '',
      offerSpread: '',
      validationError: '',
    });
    const vald = validation?.includes('@');
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const ethAddressPattern = /^(0x)?[0-9a-fA-F]{40}$/;
    if (specificBuyer) {
      if (!validation) {
        setErrors(prev => {
          return {
            ...prev,
            validationError:
              'Email or Etherum Address is required for specific buyer',
          };
        });
      }
      if (vald) {
        const emailValidate = emailRegex.test(validation);
        if (!emailValidate) {
          setErrors(prev => {
            return {
              ...prev,
              validationError: 'Email Address is invalid',
            };
          });
        }
      }
      if (!vald && validation !== '') {
        const etherumValidate = ethAddressPattern.test(validation);
        if (!etherumValidate) {
          setErrors(prev => {
            return {
              ...prev,
              validationError: 'Etherum Address is invalid',
            };
          });
        }
      }
    }
    if (!currencyType || currencyType === 'undefined' || currencyType === '') {
      setErrors(prev => {
        return {
          ...prev,
          currencyType: 'Currency type is required.',
        };
      });
    }
    if (!amount) {
      setErrors(prev => {
        return {
          ...prev,
          amount: 'Amount is required.',
        };
      });
    }
    if (!duration || duration === 'undefined' || duration === '') {
      setErrors(prev => {
        return {
          ...prev,
          duration: 'Duration is required',
        };
      });
    }
    if (!creatorFees) {
      setErrors(prev => {
        return {
          ...prev,
          creatorFees: 'Creator Fees must be from 0% to 20% max',
        };
      });
    }
    // if (specificBuyer) {
    //   if (!validation) {
    //     setErrors(prev => {
    //       return {
    //         ...prev,
    //         validationError: 'Email or WalletID is required for Specific Buyer',
    //       };
    //     });
    //   }
    // }

    if (
      !currencyType ||
      currencyType === 'undefined' ||
      currencyType === '' ||
      !amount ||
      !duration ||
      duration === 'undefined' ||
      duration === '' ||
      !creatorFees ||
      (specificBuyer && validation == '')
    )
      return;

    setModalOpen(true);
  };

  return (
    <>
      {!modalOpen && (
        <KeyboardAvoidingView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="always">
            <View style={styles.rowContainer}>
              <View style={styles.dropdownContainer}>
                <CurrencyDropdown
                  title="Currency Type"
                  data={currencyIcon}
                  setSelected={setCurrencyType}
                  value={currencyType}
                  titleStyle={styles.dropdownTitleStyle}
                  arrowStyle={styles.dropdownArrowStyle}
                />
                {errors.currencyType && (
                  <Text style={styles.errorText}>{errors.currencyType}</Text>
                )}
              </View>
              <View style={styles.amountContainer}>
                <Text style={styles.fieldText}>Amount</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.topInput}
                    placeholder="0.000001"
                    onChangeText={(name: any) => setAmount(name)}
                    placeholderTextColor={themeColors.primaryColor}
                    value={amount}
                    keyboardType="numeric"
                  />
                </View>
                {errors.amount && (
                  <Text
                    style={[styles.errorText, {marginLeft: moderateScale(15)}]}>
                    {errors.amount}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.listingDurationContainer}>
              <MintDropDown
                title="Listing Duration"
                data={listingDuration}
                setSelected={setDuration}
                value={duration}
              />
              {errors.duration && (
                <Text style={styles.errorText}>{errors.duration}</Text>
              )}
            </View>
            <Text style={styles.otherOptions}>Other Options</Text>
            <View style={[styles.sliderContainer, {marginTop: 24}]}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.createrFeesLabel}>Creator Fees</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.createrFeesLabelfee}>{creatorFees}</Text>
                  <Text style={styles.createrFeesLabelfee}>%</Text>
                </View>
              </View>

              <RangeSlider
                from={0}
                to={20}
                setCreaterFeeValue={setCreatorFees}
              />
              <View
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={{color: themeColors.garyColor}}>0%</Text>
                <Text style={{color: themeColors.garyColor}}>20%</Text>
              </View>
              {errors.creatorFees && (
                <Text style={styles.errorText}>{errors.creatorFees}</Text>
              )}
            </View>
            {/* <View style={[styles.sliderContainer, {marginTop: 27}]}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={styles.createrFeesLabel}>Offer Spread</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.createrFeesLabelfee}>{spreadValue}</Text>
                  <Text style={styles.createrFeesLabelfee}>%</Text>
                </View>
              </View>
              <RangeSlider
                from={0}
                to={20}
                setCreaterFeeValue={setSpreadValue}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: themeColors.garyColor}}>0%</Text>
                <Text style={{color: themeColors.garyColor}}>5%</Text>
              </View>
            </View> */}

            <View
              style={[
                styles.sliderContainer,
                {marginTop: moderateScale(25), marginBottom: moderateScale(25)},
              ]}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={styles.createrFeesLabel}>
                    Reserve for Specific Buyer
                  </Text>
                  <Text style={styles.noteText}>
                    This item can be purchased as soon as it's listed
                  </Text>
                </View>
                <ToggleSwitch
                  isOn={specificBuyer}
                  onColor={themeColors.aquaColor}
                  offColor={themeColors.garyColor}
                  onToggle={isOn => setSpecificBuyer(isOn)}
                />
              </View>
            </View>

            {specificBuyer && (
              <View
                style={{
                  marginHorizontal: moderateScale(20),
                  marginBottom: moderateScale(30),
                }}>
                <Text style={{color: themeColors.garyColor, fontSize: size.s}}>
                  Enter the Wallet or Email Address of the Buyer
                </Text>
                <TextInput
                  style={{
                    borderColor: themeColors.garyColor,
                    borderBottomWidth: 1,
                    fontSize: size.md,
                    marginTop: moderateScale(0),
                    color: themeColors.primaryColor,
                  }}
                  value={validation}
                  // placeholder="0X95834698569385"
                  placeholderTextColor={themeColors.primaryColor}
                  onChangeText={(e: any) => setValidation(e)}
                />
                {errors.validationError && (
                  <Text
                    style={[styles.errorText, {marginLeft: moderateScale(15)}]}>
                    {errors.validationError}
                  </Text>
                )}
              </View>
            )}

            <View style={[styles.switchContainer, {marginTop: 10}]}>
              <Text style={styles.createrFeesLabel}>
                Eligible for Co-Batching Pool
              </Text>

              <ToggleSwitch
                isOn={eligible}
                onColor={themeColors.aquaColor}
                offColor={themeColors.garyColor}
                onToggle={isOn => setEligible(isOn)}
              />
            </View>
            {/* <Text style={styles.feesLabel}>Fees</Text>
        <View style={styles.transactionContainer}></View>
          <Text style={styles.transactionFeeLabel}>Transaction Fee</Text>
          <Text style={styles.percentageLabel}>2.5%</Text>
        </View>
        <View style={styles.transactionContainer}>
          <Text style={styles.transactionFeeLabel}>Creator</Text>
          <Text style={styles.percentageLabel}>0%</Text>
        </View> */}
          </ScrollView>
          <TouchableOpacity onPress={() => setIsPreViewModalVisible(true)}>
            <Text style={styles.viewpreviewLabel}>View Preview</Text>
          </TouchableOpacity>
          {mintDetails?.marketplace_listed == 'true' ? (
            isLoading ? (
              <View style={styles.sellBtn}>
                <ActivityIndicator color="#fff" size="large" />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => handleUpdateSnft()}
                style={styles.sellBtn}>
                <Text style={styles.completeSellBtn}>Update Listing</Text>
              </TouchableOpacity>
            )
          ) : isLoading ? (
            <View style={styles.sellBtn}>
              <ActivityIndicator color="#fff" size="large" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.sellBtn}
              onPress={() => completeListingModal()}>
              <Text style={styles.completeSellBtn}>Complete Listing</Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      )}
      {isPreViewModalVisible && (
        <PreViewModal
          setIsPreViewModalVisible={setIsPreViewModalVisible}
          amount={amount}
          SNFTTitle={mintDetails?.SNFTTitle}
          thumbnail={mintDetails?.thumbnail}
          duration={duration}
          currencyType={currencyType}
        />
      )}

      {modalOpen &&
        (contract ? (
          <BuyModal
            setModalOpen={setModalOpen}
            HeaderTitle="List SNFT"
            Title={dummydataWeb3.Title}
            Description={mintDetails?.SNFTDescription}
            NetworkFees={dummydataWeb3.NetworkFees}
            Price={amount}
            EndingIn={duration}
            TransactionType={dummydataWeb3.TransactionType}
            confirmTransaction={dummydataWeb3.confirmTransaction}
            WalletID={dummydataWeb3.WalletID}
            minDetail={mintDetails}
            isLoading={isLoading}
          />
        ) : (
          <BuyModal
            setModalOpen={setModalOpen}
            HeaderTitle="List SNFT"
            Title={dummydataWeb2.Title}
            Description={dummydataWeb2.Description}
            NetworkFees={dummydataWeb2.NetworkFees}
            Price={amount}
            EndingIn={duration}
            TransactionType={dummydataWeb2.TransactionType}
            confirmTransaction={dummydataWeb2.confirmTransaction}
            WalletID={dummydataWeb2.WalletID}
            minDetail={mintDetails}
            isLoading={isLoading}
            currencyType={currencyType}
            creatorFees={creatorFees}
            eligibileForCoBatching={eligible}
            ReserveForSpecificBuyer={specificBuyer ? validation : ''}
            message={dummydataWeb2.Message}
            Congratulations={'List your SNFT'}
            SNFTTitle={mintDetails?.SNFTTitle}
          />
        ))}
    </>
  );
};

export default FixedPrice;

const styles = StyleSheet.create({
  dropdownArrowStyle: {
    // marginTop: verticalScale(6),
  },
  dropdownTitleStyle: {
    marginLeft: 10,
  },
  contentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  completeSellBtn: {
    fontFamily: Fontfamily.Neuropolitical,
    color: 'black',
    fontSize: 14,
  },
  sellBtn: {
    height: 65,
    backgroundColor: themeColors.aquaColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewpreviewLabel: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 14,
    color: themeColors.aquaColor,
    // marginTop: (Dimensions.get('window').height = 839 ? 65 : 44),
    marginBottom: moderateScale(20),
    textAlign: 'center',
    // paddingTop: moderateScale(10),
  },
  percentageLabel: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 18,
    color: 'white',
  },
  transactionFeeLabel: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: 16,
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 16,
  },
  feesLabel: {
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 24,
    marginLeft: 24,
    color: 'white',
    marginTop: 29,
  },
  noteText: {
    color: themeColors.garyColor,
    fontFamily: Fontfamily.Avenier,
    fontSize: 12,
    width: Dimensions.get('window').width <= 350 ? 220 : '100%',
  },
  createrFeesLabel: {
    fontFamily: Fontfamily.Avenier,
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  sliderContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginHorizontal: 24,
  },
  createrFeesLabelfee: {
    fontFamily: Fontfamily.Grostestk,
    color: themeColors.primaryColor,
    fontWeight: '400',
    fontSize: size.default,
  },
  otherOptions: {
    marginTop: 36,
    marginLeft: 24,
    fontFamily: Fontfamily.Neuropolitical,
    fontSize: 24,
    color: 'white',
  },
  listingDurationContainer: {
    marginHorizontal: 24,
  },
  amountContainer: {
    // marginTop: 17,
    width: '50%',
    justifyContent: 'center',
  },
  amountContainerError: {
    position: 'relative',
    top: 13,
    marginTop: 32,
    width: '50%',
  },
  dropdownContainer: {
    // flex: 0.5,
    justifyContent: 'center',
    marginLeft: 24,
    width: '40%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  topInput: {
    // height: fontSize(48),
    height: 48,
    color: themeColors.primaryColor,
  },
  fieldText: {
    marginTop: moderateScale(22),
    paddingLeft: Platform.OS == 'ios' ? moderateScale(17) : moderateScale(18),
    color: themeColors.garyColor,
    fontWeight: '400',
    fontSize: size.default,
    // paddingBottom: Platform.OS == 'ios' ? 15 : 0,
  },
  inputView: {
    borderBottomWidth: 1,
    borderColor: themeColors.garyColor,
    marginLeft: moderateScale(16),
    marginRight: moderateScale(24),
  },
  errorText: {
    color: 'red',
    marginTop: 3,
    fontFamily: Fontfamily.Avenier,
    fontSize: size.default,
  },
});
