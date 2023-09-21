import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import {themeColors} from '../theme/colors';
import {Fontfamily} from '../theme/fontFamily';
import {size} from '../theme/fontstyle';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {BlurView} from '@react-native-community/blur';
import Layout from './Layout';
import Header from './Header';
import {CrossIcon, EthereumIcon, TetherIcon} from '../assets/svg';
import {formatString} from '../utils/helper';
import {NapaTokenIcon} from '../assets/svg/NapaTokenIcon';
import {LightCrossIcon} from '../assets/svg/LightCrossIcon';
import {useToast} from 'react-native-toast-notifications';

type BUYMODALPROPS = {
  HeaderTitle?: string;
  Title?: string;
  Description?: string;
  NetworkFees?: any;
  TransactionType?: any;
  confirmTransaction?: any;
  WalletID?: any;
  setModalOpen?: any;
  minDetail?: any;
  isLoading?: boolean;
  Price?: string;
  EndingIn?: string;
  currencyType?: any;
  creatorFees?: string;
  eligibileForCoBatching?: boolean;
  ReserveForSpecificBuyer?: string;
  Congratulations?: string;
  message?: string;
  TokenId?: string;
  contractAddress?: string;
  originalCreator?: string;
  Seller?: string;
  Buyer?: any;
  totalSpend?: string;
  SNFTTitle?: string;
  isOpenPayNowButton?: boolean;
  checkBalance?: any;
  setIsOpenPayNowButton?: any;
  confirmLoading?: boolean;
};

const BuyModal: React.FC<BUYMODALPROPS> = ({
  Title,
  Description,
  NetworkFees,
  TransactionType,
  confirmTransaction,
  WalletID,
  setModalOpen,
  minDetail,
  isLoading,
  Price,
  EndingIn,
  HeaderTitle,
  currencyType,
  creatorFees,
  eligibileForCoBatching,
  ReserveForSpecificBuyer,
  message,
  TokenId,
  contractAddress,
  originalCreator,
  Seller,
  Buyer,
  totalSpend,
  Congratulations,
  SNFTTitle,
  isOpenPayNowButton,
  checkBalance,
  setIsOpenPayNowButton,
  confirmLoading,
}) => {
  const [seeDescription, setSeeDescription] = useState(false);
  const toast = useToast();
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
  return (
    <Layout>
      <StatusBar backgroundColor={themeColors.secondaryColor} />
      {!seeDescription && (
        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={() => {}}>
          <View style={styles.modalContainer}>
            <BlurView
              style={styles.absolute}
              blurType="light"
              blurAmount={10}
              overlayColor="transparent"
              reducedTransparencyFallbackColor="white"
            />
            <View style={styles.modalMainContainer}>
              <Header
                title={false}
                centerTitle={HeaderTitle}
                rightChildren={
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        if (!confirmLoading) {
                          setModalOpen(false);
                        }
                      }}>
                      <CrossIcon />
                    </TouchableOpacity>
                  </View>
                }
              />
              <View style={styles.backImageContainer}>
                <ImageBackground
                  source={{uri: minDetail?.thumbnail}}
                  style={{marginBottom: moderateScale(20)}}
                  imageStyle={styles.backImage}>
                  <View style={styles.container}>
                    <Text style={styles.title}>{minDetail?.SNFTTitle}</Text>
                  </View>
                </ImageBackground>
                <ScrollView>
                  <View
                    style={{
                      paddingHorizontal: moderateScale(10),
                      paddingVertical: moderateScale(10),
                    }}>
                    {TransactionType && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>
                          Transaction Type
                        </Text>
                        <Text style={styles.containerSubTitle}>
                          {TransactionType}
                        </Text>
                      </View>
                    )}

                    {/* {Description && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>Description</Text>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                          <TouchableOpacity
                            onPress={() => setSeeDescription(true)}>
                            <Text style={styles.containerSubTitleDescription}>
                              See Details
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )} */}

                    {TokenId && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>Views</Text>
                        <Text
                          style={[
                            styles.containerSubTitle,
                            {
                              paddingLeft: moderateScale(10),
                              textAlign: 'left',
                            },
                          ]}>
                          {TokenId}
                        </Text>
                      </View>
                    )}

                    {contractAddress && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>Popularity</Text>
                        <Text
                          style={[
                            styles.containerSubTitle,
                            {
                              paddingLeft: moderateScale(10),
                              textAlign: 'left',
                            },
                          ]}>
                          {formatString(contractAddress)}
                        </Text>
                      </View>
                    )}

                    {originalCreator && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>
                          Original Creator
                        </Text>
                        <Text
                          style={[
                            styles.containerSubTitle,
                            {
                              paddingLeft: moderateScale(10),
                              textAlign: 'left',
                            },
                          ]}>
                          {originalCreator}
                        </Text>
                      </View>
                    )}

                    {Seller && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>Seller</Text>
                        <Text
                          style={[
                            styles.containerSubTitle,
                            {
                              paddingLeft: moderateScale(10),
                              textAlign: 'left',
                            },
                          ]}>
                          {formatString(Seller)}
                        </Text>
                      </View>
                    )}

                    {Buyer && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>Buyer</Text>
                        <Text
                          style={[
                            styles.containerSubTitle,
                            {
                              paddingLeft: moderateScale(10),
                              textAlign: 'left',
                            },
                          ]}>
                          {formatString(Buyer)}
                        </Text>
                      </View>
                    )}

                    {Price && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>Price</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={styles.containerSubTitle}>
                            {handleCurrenyIcon(
                              currencyType == 'NAPA'
                                ? '0'
                                : (currencyType == 'USDT' && '1') ||
                                    (currencyType == 'ETH' && '2') ||
                                    '',
                            )}
                          </Text>
                          <Text
                            style={{
                              color: themeColors.primaryColor,
                              marginLeft: moderateScale(5),
                            }}>
                            {Price}
                          </Text>
                        </View>
                      </View>
                    )}

                    {EndingIn && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>Ending In</Text>
                        <Text style={styles.containerSubTitle}>{EndingIn}</Text>
                      </View>
                    )}

                    {WalletID && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>Wallet ID</Text>
                        <Text style={styles.containerSubTitle}>
                          {formatString(WalletID)}
                        </Text>
                      </View>
                    )}

                    {creatorFees && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>Creator Fees</Text>
                        <Text style={styles.containerSubTitle}>
                          {creatorFees}
                          {`%`}
                        </Text>
                      </View>
                    )}

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: moderateScale(10),
                        alignItems: 'center',
                      }}>
                      <Text style={styles.containerTitle}>
                        Co-Batching Pool
                      </Text>
                      <Text style={styles.containerSubTitle}>
                        {eligibileForCoBatching ? 'Eligible' : 'Not Eligible'}
                      </Text>
                    </View>

                    {ReserveForSpecificBuyer && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>
                          Reserved For Specific Buyer
                        </Text>
                        <Text
                          style={[
                            styles.containerSubTitleSpend,
                            {fontSize: size.lg},
                          ]}>
                          {ReserveForSpecificBuyer
                            ? ReserveForSpecificBuyer
                            : '-----------'}
                        </Text>
                      </View>
                    )}

                    {NetworkFees && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>Network Fees</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <EthereumIcon
                            bgColor="#6481E7"
                            iconColor={themeColors.primaryColor}
                            width={25}
                            height={25}
                          />
                          <Text
                            style={[
                              styles.containerSubTitle,
                              {marginLeft: moderateScale(5)},
                            ]}>
                            {NetworkFees}
                          </Text>
                        </View>
                      </View>
                    )}

                    {totalSpend && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: moderateScale(10),
                          alignItems: 'center',
                        }}>
                        <Text style={styles.containerTitle}>Total Spend</Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text>{handleCurrenyIcon(currencyType)}</Text>
                          <Text
                            style={[
                              styles.containerSubTitle,
                              {marginLeft: moderateScale(5)},
                            ]}>
                            {totalSpend}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </ScrollView>
              </View>
              <View>
                {isLoading ? (
                  <View
                    style={{
                      backgroundColor: themeColors.aquaColor,
                      height: 60,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator color="#fff" size="large" />
                  </View>
                ) : !isOpenPayNowButton ? (
                  confirmLoading ? (
                    <TouchableOpacity
                      disabled
                      style={{
                        backgroundColor: themeColors.aquaColor,
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <ActivityIndicator size={'large'} color={'#fff'} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        // if (Buyer && !gasFee) {
                        //   toast.show('Error while getting gas fee', {
                        //     type: 'danger',
                        //   });
                        //   setModalOpen(false);
                        //   return;
                        // }
                        if (checkBalance) {
                          checkBalance();
                        } else {
                          confirmTransaction();
                        }
                      }}
                      // disabled={Buyer && !gasFee}
                      style={{
                        backgroundColor: themeColors.aquaColor,
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: themeColors.secondaryColor,
                          fontFamily: Fontfamily.Neuropolitical,
                          fontSize: size.default,
                          fontWeight: '500',
                        }}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  )
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setModalOpen(false);
                        setIsOpenPayNowButton(false);
                      }}
                      style={{
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: themeColors.primaryColor,
                          fontFamily: Fontfamily.Neuropolitical,
                          fontSize: size.default,
                          fontWeight: '500',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => confirmTransaction()}
                      style={{
                        backgroundColor: themeColors.aquaColor,
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: themeColors.secondaryColor,
                          fontFamily: Fontfamily.Neuropolitical,
                          fontSize: size.default,
                          fontWeight: '500',
                        }}>
                        Pay Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal>
      )}

      {seeDescription && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={seeDescription}
          onRequestClose={() => {
            setSeeDescription(false);
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
                <Text style={styles.title}>{Congratulations}</Text>
                <TouchableOpacity onPress={() => setSeeDescription(true)}>
                  <Text style={[styles.snftTitle]}>{SNFTTitle}</Text>
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
                  {message}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setSeeDescription(false)}
              style={styles.crossStyle}>
              <LightCrossIcon color="#fff" opacity={3} width={35} height={35} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </Layout>
  );
};

export default BuyModal;

const styles = StyleSheet.create({
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
  modalMainContainer: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? moderateScale(25) : moderateScale(0),
    justifyContent: 'space-between',
  },
  backImageContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  backImage: {
    height: 300,
    width: '100%',
    borderRadius: 30,
  },
  container: {
    height: 300,
    justifyContent: 'flex-end',
    paddingBottom: moderateScale(20),
    paddingHorizontal: moderateScale(10),
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
  descriptionTitle: {
    color: themeColors.primaryColor,
    fontSize: size.xxlg,
    fontWeight: '500',
    fontFamily: Fontfamily.Neuropolitical,
    width: 255,
    marginBottom: moderateScale(30),
    paddingHorizontal: moderateScale(10),
    // textAlign: 'center',
    alignSelf: 'center',
    borderBottomColor: themeColors.primaryColor,
    borderBottomWidth: 1,
  },
  containerTitle: {
    color: themeColors.primaryColor,
    fontSize: size.md,
    fontWeight: 'bold',
    fontFamily: Fontfamily.Avenier,
  },
  containerSubTitle: {
    color: themeColors.primaryColor,
    fontSize: size.md,
    fontWeight: '400',
    fontFamily: Fontfamily.Avenier,
  },
  containerSubTitleDescription: {
    color: themeColors.aquaColor,
    fontSize: size.md,
    fontWeight: 'bold',
    fontFamily: Fontfamily.Avenier,
    // textAlign: 'left',
    // marginLeft: Dimensions.get('window').width < 337 ? moderateScale(25) : 0,
  },
  containerSubTitleDescriptionDetail: {
    color: themeColors.aquaColor,
    fontSize: size.md,
    fontWeight: 'bold',
    paddingHorizontal: moderateScale(4),
    fontFamily: Fontfamily.Avenier,
  },
  containerSubTitleSpend: {
    color: themeColors.primaryColor,
    fontSize: size.xlg,
    fontWeight: '400',
    fontFamily: Fontfamily.Avenier,
  },
  messageContainer: {
    marginTop: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    color: themeColors.primaryColor,
    fontSize: size.md,
    fontWeight: '400',
    fontFamily: Fontfamily.Avenier,
    lineHeight: 20,
    paddingVertical: moderateScale(10),
  },
  crossStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
